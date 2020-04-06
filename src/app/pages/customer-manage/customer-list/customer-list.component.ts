import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { ISearchListItem, searchListItem, ISearchListModel, ICustomerItem,
    searchListModel, tableConfig, listValue } from './customer-list.component.config';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
// import { NzModalRef } from 'ng-zorro-antd/modal';
import { AssignCustomerModalComponent } from '../modal/assign-customer-modal/assign-customer-modal.component';
import { TransferCustomerModalComponent } from '../modal/transfer-customer-modal/transfer-customer-modal.component';
import { TrackingCustomerModalComponent } from '../modal/tracking-customer-modal/tracking-customer-modal.component';

type ITableCfg = typeof tableConfig;
type pageChangeType = 'pageIndex' | 'pageSize';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class CustomerListComponent implements OnInit, OnDestroy {
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    /** 客户列表table展示数据 */
    customerList: ICustomerItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConfig;
    /** 分页 */
    pageInfo: PaginationService;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 是否所有展示出来的数据都被选中 */
    isAllDisplayDataChecked = false;
    /** 复选框不确定的 */
    isIndeterminate = false;
    /** 选中的记录 */
    mapOfCheckedId: { [key: string]: boolean } = {};
    /** 是否可以删除 */
    canDeleteCustomer: boolean;
    /** 删除弹窗 */
    confirmModal: NzModalRef;

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.customerList = [];
        this.pageInfo = new PaginationService({
            total: 200,
            pageSize: 10,
            pageIndex: 1
        });
        this.canDeleteCustomer = false;
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
        this.loadCustomerList({});
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
    loadCustomerList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        
        setTimeout(() => {
            this.customerList = listValue();
            this.isLoading = false;

            if (pageChangeType === 'pageSize') {
                this.pageInfo.pageIndex = 1;
            }
        }, 2000);
    }

    /**
     * @callback
     * @desc 分配客户
     */
    assignCustomer() {
        const customerList = this.customerList.filter(customer => this.mapOfCheckedId[customer.carId]);

        const modal = this.modalService.create({
            nzTitle: '分配客户',
            nzContent: AssignCustomerModalComponent,
            nzComponentParams: {
                customerList
            },
            nzWidth: 600,
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `分配成功`);
                this.search();
            }
        });
    }

    /**
     * @callback
     * @desc 转移客户
     */
    transferCustomer() {
        const customerList = this.customerList.filter(customer => this.mapOfCheckedId[customer.carId]);

        const modal = this.modalService.create({
            nzTitle: '转移客户',
            nzContent: TransferCustomerModalComponent,
            nzComponentParams: {
                customerList
            },
            nzWidth: 600,
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `转移成功`);
                this.search();
            }
        });
    }

    /**
     * @callback
     * @desc 投保跟踪设置
     */
    trackingCustomer() {
        const customerList = this.customerList.filter(customer => this.mapOfCheckedId[customer.carId]);

        const modal = this.modalService.create({
            nzTitle: '投保跟踪设置',
            nzContent: TrackingCustomerModalComponent,
            nzComponentParams: {
                customerList
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `跟踪设置成功`);
                this.search();
            }
        });
    }

    /**
     * @callback
     * @desc 导出客户
     */
    exportCustomer() {

    }

    /**
     * @callback
     * @desc 删除客户
     */
    deleteCustomer() {
        this.confirmModal = this.modalService.confirm({
            nzTitle: '提示',
            nzContent: '您确认要删除吗？',
            nzOnOk: () => {
                this.message.success('删除成功');
                this.search();
            },
            nzOnCancel: () => {
                this.message.info('您已取消删除');
            }
        });
    }

    /**
     * @callback
     * @desc 选中全部
     * @param value 
     */
    checkAll(value: boolean) {
        this.customerList.forEach(item => {
            this.mapOfCheckedId[item.carId] = value;
        });
        this.refreshStatus();
    }

    /**
     * @callback
     * @desc 选中刷新状态
     */
    refreshStatus() {
        this.isAllDisplayDataChecked = this.customerList.every(item => this.mapOfCheckedId[item.carId]);
        this.isIndeterminate = this.customerList.some(item => this.mapOfCheckedId[item.carId]) && !this.isAllDisplayDataChecked;
        this.computedCanDeleteCustomerVal();
    }

    /**
     * @func
     * @desc 计算是否能够使用删除按钮
     */
    computedCanDeleteCustomerVal() {
        this.canDeleteCustomer = this.customerList.some(item => this.mapOfCheckedId[item.carId]);
    }

    /**
     * @callback
     * @desc 展示客户详情信息
     * @param customer 
     */
    customerDetail(customer: ICustomerItem) {

    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;

        this.loadCustomerList({}, property);
    }

    ngOnDestroy() {}
}
