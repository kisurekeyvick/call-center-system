import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { tableConfig, IRoleItem, defaultRoleItem, IFormatPermissionItem } from './role-list.component.config';
import { IPermission } from 'src/app/api/api.interface';
import { NzMessageService } from 'ng-zorro-antd';
import { NzTreeComponent } from 'ng-zorro-antd/tree';
import { OrganizationService } from '../organization-manage.service';
import { catchError } from 'rxjs/operators';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { of } from 'rxjs';

type ITableCfg = typeof tableConfig;
type IOperationStatus = 'add' | 'modify' | 'detail' | '';

@Component({
    selector: 'organization-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class RoleListComponent implements OnInit, OnDestroy {
    /** table列表配置 */
    tableCfg: ITableCfg = tableConfig;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 角色列表 */
    roleList: IRoleItem[];
    /** 展示抽屉 */
    drawerVisible: boolean;
    /** 当前选中的角色 */
    currentRole: IRoleItem;
    /** tree组件相关 */
    @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent: NzTreeComponent;
    defaultCheckedKeys = [];
    defaultExpandedKeys = [];
    defaultSelectedKeys = [];
    roleTreeNode: IPermission[] = [];
    /** 角色的操作状态 */
    operationStatus: IOperationStatus = 'detail';

    constructor(
        private message: NzMessageService,
        private organizationService: OrganizationService,
        private localCache: LocalStorageService
    ) {
        this.isLoading = true;
        this.roleList = [];
        this.drawerVisible = false;
    }

    ngOnInit() {
        this.loadRoleMenu();
        this.loadRoleList();
    }

    /**
     * @func
     * @desc 加载角色菜单权限功能
     */
    loadRoleMenu() {
        this.organizationService.loadAllRolePermission().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.roleTreeNode = this.rebuildRoleTreeNode(res);
            }
        });
    }

    /**
     * @func
     * @desc 加载角色列表
     */
    loadRoleList() {
        this.isLoading = true;

        this.organizationService.queryRole().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;
            if (res instanceof Array) {
                this.roleList = res;
                this.localCache.set(LocalStorageItemName.ROLEINFO, res);
            }
        });
    }

    /**
     * @func
     * @desc 重新构建节点树的结构
     */
    rebuildRoleTreeNode(tree: IPermission[]): IPermission[] {
        const formatTree = node => {
            const children = () => {
                if (node.childrens && node.childrens.length > 0) {
                    return node.childrens.map(child => {
                        return formatTree(child);
                    });
                } {
                    return [];
                }
            };

            const value = {
                ...node,
                title: node.name,
                key: node.code,
                children: children()
            };

            return value;
        };

        return tree.map((node) => {
            return formatTree(node);
        });
    }

    /**
     * @callback
     * @desc 新增角色
     */
    addRole() {
        this.drawerVisible = true;
        this.operationStatus = 'add';
        this.currentRole = {...defaultRoleItem};
    }

    /**
     * @callback
     * @desc 删除角色
     * @param role 
     */
    deleteRole(role: IRoleItem) {
        this.message.create('success', `删除成功`);
    }

    /**
     * @callback
     * @desc 展示抽屉
     */
    showDrawer(role: IRoleItem) {
        this.roleList.forEach((list: IRoleItem) => {
            list['selected'] = list.roleCode === role.roleCode;
        });

        this.currentRole = role;
        this.operationStatus = 'modify';
        this.drawerVisible = true;
    }

    /**
     * @callback
     * @desc 保存角色变更
     */
    saveRoleChange() {
        const params = {
            roleName: this.currentRole.roleName,
            permissions: this.formatCheckedPermissions()
        };

        this.organizationService.addRole(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.operationStatus = 'modify';
            this.drawerVisible = false;
            this.message.create('success', `保存成功`);

            this.loadRoleList();
        });
    }

    /**
     * @func
     * @desc 获取已经选中的权限
     */
    formatCheckedPermissions(): IFormatPermissionItem[] {
        const result = [];

        const readCheckedNode = (nodes: IPermission[]) => {
            nodes.forEach((node: IPermission) => {
                if (node.checked) {
                    result.push({
                        code: node.code,
                        type: node.type
                    });
                }

                if (node.children && node.children.length > 0) {
                    readCheckedNode(node.children);
                }
            });
        };

        readCheckedNode(this.roleTreeNode);

        return result;
    }

    /**
     * @func
     * @desc 点击树节点触发
     */
    nzTreeClick(e: any) {

    }

    /**
     * @func
     * @desc 点击树节点 Checkbox 触发
     */
    nzTreeCheck(e: any) {

    }

    /**
     * @func
     * @desc 关闭抽屉
     */
    closeDrawer() {
        this.drawerVisible = false;
    }

    ngOnDestroy() {}
}
