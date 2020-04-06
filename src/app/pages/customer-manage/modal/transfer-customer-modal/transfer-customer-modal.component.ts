import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { tableConfig } from './transfer-customer-modal.component.config';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { listValue } from './transfer-customer-modal.component.config';
import { ICustomerItem } from '../../customer-list/customer-list.component.config';

type ITableCfg = typeof tableConfig;

@Component({
    selector: 'transfer-customer-modal',
    templateUrl: './transfer-customer-modal.component.html',
    styleUrls: ['./transfer-customer-modal.component.scss']
})
export class TransferCustomerModalComponent implements OnInit, OnDestroy {
    /** table列表配置 */
    tableCfg: ITableCfg = tableConfig;
    /** 人员列表 */
    employeesList: any[];
    /** 是否正在加载 */
    isLoading: boolean;
    /** 是否所有展示出来的数据都被选中 */
    isAllDisplayDataChecked = false;
    /** 复选框不确定的 */
    isIndeterminate = false;
    /** 选中的记录 */
    mapOfCheckedId: { [key: string]: boolean } = {};
    /** 分页 */
    pageInfo: PaginationService;

    /** 传递过来的客户列表数据 */
    @Input() customerList: ICustomerItem[] = [];

    constructor(
        private modal: NzModalRef
    ) {
        this.employeesList = [];
        this.pageInfo = new PaginationService({
            total: 200,
            pageSize: 10,
            pageIndex: 1,
            size: 'small',
            showSizeChanger: false,
            showQuickJumper: false
        });
    }

    ngOnInit() {
        this.loadCustomerList();
    }

    /**
     * @func
     * @desc 加载客户列表
     */
    loadCustomerList() {
        this.isLoading = true;
        
        setTimeout(() => {
            this.employeesList = listValue();
            this.isLoading = false;
        }, 2000);
    }

    /**
     * @callback
     * @desc 选中全部
     * @param value 
     */
    checkAll(value: boolean) {
        this.employeesList.forEach(item => {
            this.mapOfCheckedId[item.id] = value;
        });
        this.refreshStatus();
    }

    /**
     * @callback
     * @desc 选中刷新状态
     */
    refreshStatus() {
        this.isAllDisplayDataChecked = this.employeesList.every(item => this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.employeesList.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;
    }

    cancel() {
        this.modal.destroy('error');
    }

    sure() {
        this.modal.destroy('success');
    }

    ngOnDestroy() {}
}
