import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { tableConfig, roleList, IRoleItem, IAllmenu, allmenu, ITreeNode, defaultRoleItem } from './role-list.component.config';
import { NzMessageService } from 'ng-zorro-antd';
import { NzTreeComponent } from 'ng-zorro-antd/tree';

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
    roleTreeNode: ITreeNode[] = [];
    /** 角色的操作状态 */
    operationStatus: IOperationStatus = 'detail';

    constructor(
        private message: NzMessageService
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
        this.roleTreeNode = this.rebuildRoleTreeNode([...allmenu]);
    }

    /**
     * @func
     * @desc 加载角色列表
     */
    loadRoleList() {
        this.isLoading = true;

        setTimeout(() => {
            this.isLoading = false;
            this.roleList = [...roleList];
        }, 2000);
    }

    /**
     * @func
     * @desc 重新构建节点树的结构
     */
    rebuildRoleTreeNode(tree: IAllmenu): ITreeNode[] {
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
        this.operationStatus = 'modify';
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
