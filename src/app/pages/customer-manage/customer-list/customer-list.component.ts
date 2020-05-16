import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { ISearchListItem, searchListItem, ISearchListModel, ICustomerItem,
    searchListModel, tableConfig, searchListLayout, companyList, renewalStateList, customerStatusList,
    ISalesman } from './customer-list.component.config';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
// import { NzModalRef } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
// import { AssignCustomerModalComponent } from '../modal/assign-customer-modal/assign-customer-modal.component';
// import { TransferCustomerModalComponent } from '../modal/transfer-customer-modal/transfer-customer-modal.component';
// import { TrackingCustomerModalComponent } from '../modal/tracking-customer-modal/tracking-customer-modal.component';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { CustomerService, IQueryCustomerParams } from '../customer-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { findValueName } from 'src/app/core/utils/function';
import * as dayjs from 'dayjs';
import { UtilsService } from 'src/app/core/utils/utils.service';
import { CustomerImportModalComponent } from '../modal/customer-import-modal/customer-import-modal.component';
import { ApiService } from 'src/app/api/api.service';

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
    searchListLayout: ICommon;
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
    /** 当前用户信息 */
    currentUser: ICommon;
    /** 业务员 */
    salesmenList: ISalesman[];
    
    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private router: Router,
        private localCache: LocalStorageService,
        private customerService: CustomerService,
        private utilsService: UtilsService,
        private apiService: ApiService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        this.customerList = [];
        this.salesmenList = [];
        this.pageInfo = new PaginationService({
            total: 0,
            pageSize: 10,
            pageIndex: 1
        });
        this.canDeleteCustomer = false;
        this.isLoading = false;
    }

    ngOnInit() {
        this.loadSalesMember();
        const userCacheInfo = this.localCache.get(LocalStorageItemName.USERPROFILE);
        this.currentUser = userCacheInfo && userCacheInfo['value'] || {};
        this.search();
    }

    /**
     * @func
     * @desc 加载业务员
     */
    loadSalesMember() {
        this.apiService.querySaleman().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.salesmenList = res.map(item => ({
                    ...item,
                    value: item.id
                }));

                this.rebuildSearchListItem();
            }
        });
    }

    /**
     * @func
     * @desc 重新构建searchListItem
     */
    rebuildSearchListItem() {
        const userIdItemIndex = this.searchListItem.findIndex(item => item.key === 'userId');

        if (userIdItemIndex > -1) {
            this.searchListItem[userIdItemIndex]['config']['options'] = this.salesmenList;
        }
    }

    /**
     * @callback
     * @desc 搜索
     */
    search() {
        const params = this.formatSearchParams();

        this.loadCustomerList(params);
    }

    /**
     * @callback
     * @desc 重置搜索内容
     */
    reseat() {
        this.searchListModel = {...searchListModel};
    }

    /**
     * @func
     * @desc format请求的参数
     */
    formatSearchParams(): IQueryCustomerParams {
        const { registerTime, insuranceTime, distributionTime, appointmentTime, updateTime } = this.searchListModel;
        const params = {
            ...this.searchListModel,
            startRegisterTime: registerTime[0] && new Date(registerTime[0]).getTime() || null,
            endRegisterTime: registerTime[1] && new Date(registerTime[1]).getTime() || null,
            insuranceStartDate: insuranceTime[0] && new Date(insuranceTime[0]).getTime() || null,
            insuranceEndDate: insuranceTime[1] && new Date(insuranceTime[1]).getTime() || null,
            distributionStartDate: distributionTime[0] && new Date(distributionTime[0]).getTime() || null,
            distributionEndDate: distributionTime[1] && new Date(distributionTime[1]).getTime() || null,
            appointmentStartDate: appointmentTime[0] && new Date(appointmentTime[0]).getTime() || null,
            appointmentEndDate: appointmentTime[1] && new Date(appointmentTime[1]).getTime() || null,
            updateStartDate: updateTime[0] && new Date(updateTime[0]).getTime() || null,
            updateEndDate: updateTime[1] && new Date(updateTime[1]).getTime() || null,
        };

        return params;
    }

    /**
     * @func
     * @desc 加载员工列表
     */
    loadCustomerList(params: IQueryCustomerParams, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        const { pageIndex, pageSize } = this.pageInfo;
        const requestParam: ICommon = {
            ...params,
            basePageInfo: {
                pageNum: pageIndex,
                pageSize
            }
        };

        delete requestParam.registerTime;

        this.customerService.queryCustomer(requestParam).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                if (res.list) {
                    const { list, total } = res;
                    this.customerList = list.map(item => {
                        const { distributionDate, appointmentTime, registerTime, updateTime, handleState, compulsoryEndTime } = item;
                        item['renewalStateName'] = findValueName(renewalStateList, item['renewalState']);
                        item['lastCompanyName'] = findValueName(companyList, item['lastCompanyCode']);
                        item['distributionDateTimeFormat'] = distributionDate && dayjs(distributionDate).format('YYYY-MM-DD') || '--';
                        item['appointmentTimeFormat'] = appointmentTime && dayjs(appointmentTime).format('YYYY-MM-DD') || '--';
                        item['registerTimeFormat'] = registerTime && dayjs(registerTime).format('YYYY-MM-DD') || '--';
                        item['compulsoryEndTimeFormat'] = compulsoryEndTime && dayjs(compulsoryEndTime).format('YYYY-MM-DD') || '--';
                        item['updateTimeFormat'] = updateTime && dayjs(updateTime).format('YYYY-MM-DD') || '--';
                        item['handleStateName'] = handleState && findValueName(customerStatusList, handleState) || '--';
                        return item;
                    });
                    this.pageInfo.total = total;
                } else {
                    this.customerList = [];
                    this.pageInfo.total = 0;
                }
                
                pageChangeType === 'pageSize' && (this.pageInfo.pageIndex = 1);
            }
        });
    }

    /**
     * @callback
     * @desc 分配客户
     */
    // assignCustomer() {
    //     const customerList = this.customerList.filter(customer => this.mapOfCheckedId[customer.id]);

    //     const modal = this.modalService.create({
    //         nzTitle: '分配客户',
    //         nzContent: AssignCustomerModalComponent,
    //         nzComponentParams: {
    //             customerList,
    //             queryParams: this.searchListModel
    //         },
    //         nzWidth: 600,
    //         nzMaskClosable: false,
    //         nzFooter: null
    //     });

    //     modal.afterClose.subscribe((res) => {
    //         if (res === 'success') {
    //             this.message.create('success', `分配成功`);
    //             this.search();
    //         }
    //     });
    // }

    /**
     * @callback
     * @desc 转移客户
     */
    // transferCustomer() {
    //     const customerList = this.customerList.filter(customer => this.mapOfCheckedId[customer.id]);

    //     const modal = this.modalService.create({
    //         nzTitle: '转移客户',
    //         nzContent: TransferCustomerModalComponent,
    //         nzComponentParams: {
    //             customerList
    //         },
    //         nzWidth: 600,
    //         nzMaskClosable: false,
    //         nzFooter: null
    //     });

    //     modal.afterClose.subscribe((res) => {
    //         if (res === 'success') {
    //             this.message.create('success', `转移成功`);
    //             this.search();
    //         }
    //     });
    // }

    /**
     * @callback
     * @desc 投保跟踪设置
     */
    // trackingCustomer() {
    //     const customerList = this.customerList.filter(customer => this.mapOfCheckedId[customer.id]);

    //     const modal = this.modalService.create({
    //         nzTitle: '投保跟踪设置',
    //         nzContent: TrackingCustomerModalComponent,
    //         nzComponentParams: {
    //             customerList
    //         },
    //         nzMaskClosable: false,
    //         nzFooter: null
    //     });

    //     modal.afterClose.subscribe((res) => {
    //         if (res === 'success') {
    //             this.message.create('success', `跟踪设置成功`);
    //             this.search();
    //         }
    //     });
    // }

    /**
     * @callback
     * @desc 导出客户
     */
    exportCustomer() {
        const params = {
            httpMethod: 'POST',
            httpUrl: 'api/customer/export',
            fileName: '客户列表',
            requestParams: this.formatSearchParams()
        };

        this.utilsService.downloadFile(params);
    }

    /**
     * @callback
     * @desc 添加客户
     */
    addCustomer() {
        this.router.navigate(['/customer/list/', 'add']);
    }

    /**
     * @callback
     * @desc 导入数据
     */
    // importCustomer() {
    //     const modal = this.modalService.create({
    //         nzTitle: '导入数据',
    //         nzContent: CustomerImportModalComponent,
    //         nzComponentParams: {},
    //         nzMaskClosable: false,
    //         nzFooter: null
    //     });

    //     modal.afterClose.subscribe((res) => {
    //         // if (res === 'success') {
    //         //     this.message.create('success', `导入成功`);
    //         //     this.search();
    //         // }
    //     });
    // }

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
            this.mapOfCheckedId[item.id] = value;
        });
        this.refreshStatus();
    }

    /**
     * @callback
     * @desc 选中刷新状态
     */
    refreshStatus() {
        this.isAllDisplayDataChecked = this.customerList.every(item => this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.customerList.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
        this.computedCanDeleteCustomerVal();
    }

    /**
     * @func
     * @desc 计算是否能够使用删除按钮
     */
    computedCanDeleteCustomerVal() {
        this.canDeleteCustomer = this.customerList.some(item => this.mapOfCheckedId[item.id]);
    }

    /**
     * @callback
     * @desc 展示客户详情信息
     * @param customer 
     */
    customerDetail(customer: ICustomerItem) {
        const cache = {
            originPage: 'customer/list',
            customerListCache: this.customerList,
            currentCustomer: customer
        };

        this.localCache.set(LocalStorageItemName.CUSTOMERDETAIL, cache);
        this.router.navigate(['/customer/list', 'detail']);
    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;

        const params = this.formatSearchParams();
        this.loadCustomerList(params, property);
    }

    ngOnDestroy() {}
}
