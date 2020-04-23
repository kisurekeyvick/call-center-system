import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { tableConfig, listValue } from './assign-customer-modal.component.config';
import { ICustomerItem, ISearchListModel, searchListModel as defaultSearchListModel } from '../../customer-list/customer-list.component.config';
import { CustomerService } from '../../customer-manage.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

type ITableCfg = typeof tableConfig;

@Component({
    selector: 'assign-customer-modal',
    templateUrl: './assign-customer-modal.component.html',
    styleUrls: ['./assign-customer-modal.component.scss']
})
export class AssignCustomerModalComponent implements OnInit, OnDestroy {
    /** table列表配置 */
    tableCfg: ITableCfg = tableConfig;
    /** 人员列表 */
    employeesList: any[];
    /** 是否正在加载 */
    isLoading: boolean;
    /** 是否所有展示出来的数据都被选中 */
    // isAllDisplayDataChecked = false;
    /** 复选框不确定的 */
    // isIndeterminate = false;
    /** 选中的记录 */
    // mapOfCheckedId: { [key: string]: boolean } = {};
    /** 可分配总数 */
    totalNumber: number;
    /** 剩余可分配的总数 */
    lastAssignNumber: number;

    /** 传递过来的客户列表数据 */
    @Input() customerList: ICustomerItem[] = [];
    /** 搜索条件 */
    @Input() queryParams: ISearchListModel = defaultSearchListModel;

    constructor(
        private modal: NzModalRef,
        private customerService: CustomerService
    ) {
        this.employeesList = [];
        this.totalNumber = 0;
        this.lastAssignNumber = 0;
    }

    ngOnInit() {
        this.loadTotalNumber();
        this.loadCustomerList();
    }

    /**
     * @func
     * @desc 加载可分配的总额数
     */
    loadTotalNumber() {
        const { registerTime } = this.queryParams;
        const params = {
            ...this.queryParams,
            startRegisterTime: registerTime[0] && new Date(registerTime[0]).getTime() || null,
            endRegisterTime: registerTime[1] && new Date(registerTime[1]).getTime() || null,
        };

        this.customerService.queryTotalNumber(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (typeof res === 'number') {
                this.totalNumber = res;
                this.lastAssignNumber = res;
            }
        });
    }

    /**
     * @func
     * @desc 加载业务员列表
     */
    loadCustomerList() {
        this.isLoading = true;
        
        setTimeout(() => {
            this.employeesList = listValue().map(item => ({
                ...item,
                number: 0
            }));
            this.isLoading = false;
        }, 2000);
    }

    /**
     * @callback
     * @desc 
     */
    assignNumberChange(salesman: ICustomerItem) {
        this.lastAssignNumber = this.totalNumber
    }

    /**
     * @callback
     * @desc 选中全部
     * @param value 
     */
    // checkAll(value: boolean) {
    //     this.employeesList.forEach(item => {
    //         this.mapOfCheckedId[item.id] = value;
    //     });
    //     this.refreshStatus();
    // }

    /**
     * @callback
     * @desc 选中刷新状态
     */
    // refreshStatus() {
    //     this.isAllDisplayDataChecked = this.employeesList.every(item => this.mapOfCheckedId[item.id]);
    //     this.isIndeterminate = this.employeesList.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    // }

    cancel() {
        this.modal.destroy('error');
    }

    sure() {
        this.modal.destroy('success');
    }

    ngOnDestroy() {}
}
