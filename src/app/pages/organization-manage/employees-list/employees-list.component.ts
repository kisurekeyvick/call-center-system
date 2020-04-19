import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { searchListItem, ISearchListItem, ISearchListModel, searchListModel, IEmployeeItem, 
    tableConifg, listValue, ISearchListParams, IRoleItem } from './employees-list.component.config';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EmployeeFormComponent, defaultFormModel } from '../modal/employee-form/employee-form-modal.component';
import { OrganizationService } from '../organization-manage.service';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/api/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

type ITableCfg = typeof tableConifg;
type pageChangeType = 'pageIndex' | 'pageSize';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'organization-employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class EmployeesListComponent implements OnInit, OnDestroy {
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    /** 员工列表table展示数据 */
    employeesList: IEmployeeItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;
    /** 分页 */
    pageInfo: PaginationService;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 角色列表 */
    roleList: IRoleItem[];

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private organizationService: OrganizationService,
        private appService: AppService,
        private apiService: ApiService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.employeesList = [];
        this.roleList = [];
        this.pageInfo = new PaginationService({
            total: 200,
            pageSize: 10,
            pageIndex: 1
        });
    }

    ngOnInit() {
        this.search({
            roleCode: null,
            accountStatus: null,
            nameOrPhone: null
        });
        this.loadRoleList();
    }

    /**
     * @func
     * @desc 加载角色
     */
    loadRoleList() {
        this.apiService.queryRole().subscribe(res => {
            let roleList: IRoleItem[] = res;
            roleList = roleList.map((role: IRoleItem) => ({
                ...role,
                name: role.roleName,
                value: role.roleCode
            }));

            this.roleList = roleList;
            const roleCodeSearchItem = this.searchListItem.find(item => item.key === 'roleCode');
            roleCodeSearchItem.config.options = roleList;
        });
    }

    /**
     * @callback
     * @desc 搜索
     */
    search(params?: ISearchListParams) {
        const searchParams = {};
        Object.assign(searchParams, {
            ...this.searchListModel,
            ...params
        });

        this.loadEmployeesList(searchParams);
    }

    /**
     * @callback
     * @desc 重置搜索内容
     */
    reseat() {
        this.searchListModel = Object.assign(this.searchListModel, {
            roleCode: null,
            accountStatus: null,
            nameOrPhone: null
        });
    }

    /**
     * @func
     * @desc 加载员工列表
     */
    loadEmployeesList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;

        const { pageSize, pageIndex } = this.pageInfo;

        params = {
            pagesize: pageSize,
            pageindex: pageChangeType === 'pageSize' ? 1 : pageIndex,
            ...params,
        };

        this.organizationService.queryUserList(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            pageChangeType === 'pageSize' && (this.pageInfo.pageIndex = 1);
            this.employeesList = listValue();
            this.isLoading = false;
        });
    }

    /**
     * @callback
     * @desc 添加员工
     */
    addEmployee() {
        const modal = this.modalService.create({
            nzTitle: '新增员工',
            nzContent: EmployeeFormComponent,
            nzComponentParams: {
                formModel: {...defaultFormModel},
                formModalType: 'add',
                roleList: this.roleList
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `添加成功`);
                this.search({
                    pageIndex: 1
                });
            }
        });
    }

    /**
     * @callback
     * @desc 编辑员工
     */
    editEmployee(employee: IEmployeeItem) {
        const modal = this.modalService.create({
            nzTitle: '编辑员工',
            nzContent: EmployeeFormComponent,
            nzComponentParams: {
                formModel: employee,
                formModalType: 'edit',
                roleList: this.roleList
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `编辑成功`);
                this.search({});
            }
        });
    }

    /**
     * @callback
     * @desc 删除员工
     */
    deleteEmployee(employee: IEmployeeItem) {
        const params = {
            id: employee.id
        };

        this.organizationService.deleteUserInfo(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.message.create('success', `删除成功`);
        });
    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;

        this.loadEmployeesList(this.searchListModel, property);
    }

    ngOnDestroy() {}
}
