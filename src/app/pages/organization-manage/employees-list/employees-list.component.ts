import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { searchListItem, ISearchListItem, ISearchListModel, searchListModel, IEmployeeItem, 
    tableConifg, listValue } from './employees-list.component.config';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EmployeeFormComponent, defaultFormModel } from '../modal/employee-form/employee-form-modal.component';

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

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.employeesList = [];
        this.pageInfo = new PaginationService({
            total: 200,
            pageSize: 10,
            pageIndex: 1
        });
        this.isLoading = true;
    }

    ngOnInit() {
        this.search();
    }

    /**
     * @callback
     * @desc 搜索
     */
    search() {
        console.log(this.searchListModel);
        this.loadEmployeesList({});
    }

    /**
     * @callback
     * @desc 重置搜索内容
     */
    reseat() {

    }

    /**
     * @func
     * @desc 加载员工列表
     */
    loadEmployeesList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        
        setTimeout(() => {
            this.employeesList = listValue();
            this.isLoading = false;

            if (pageChangeType === 'pageSize') {
                this.pageInfo.pageIndex = 1;
            }
        }, 2000);
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
                formModalType: 'add'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `添加成功`);
                this.search();
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
                formModel: {...defaultFormModel},
                formModalType: 'edit'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `添加成功`);
                this.search();
            }
        });
    }

    /**
     * @callback
     * @desc 删除员工
     */
    deleteEmployee(employee: IEmployeeItem) {
        this.message.create('success', `删除成功`);
    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;

        this.loadEmployeesList({}, property);
    }

    ngOnDestroy() {}
}
