import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { ISearchListItem, searchListItem, ISearchListModel, IPolicyReviewItem,
    searchListModel, tableConfig, searchListLayout, renewalStateList, companyList, internalOrderStatusList,
    ISalesman, printStyle } from './policy-review-list.component.config';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { ConfirmOutDocModalComponent } from '../modal/confirm-outDoc/confirm-outDoc-modal.component';
import { PolicyReviewService, IQueryCustomerParams } from '../policy-review.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { findValueName } from 'src/app/core/utils/function';
import * as dayjs from 'dayjs';
import { ApiService } from 'src/app/api/api.service';

type ITableCfg = typeof tableConfig;
type pageChangeType = 'pageIndex' | 'pageSize';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'policy-review-list',
    templateUrl: './policy-review-list.component.html',
    styleUrls: ['./policy-review-list.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class PolicyReviewListComponent implements OnInit, OnDestroy {
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    searchListLayout: ICommon;
    /** table列表配置 */
    policyReviewList: IPolicyReviewItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConfig;
    /** 分页 */
    pageInfo: PaginationService;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 业务员 */
    salesmenList: ISalesman[];
    /** 是否可以打印 */
    canPrint: boolean = false;
    /** 是否全部选中 */
    isAllDisplayDataChecked: boolean = false;
    isIndeterminate: boolean = false;
    /** 选中记录 */
    mapOfCheckedId: { [key: string]: boolean } = {};
    /** 当前要打印的数据 */
    printList: IPolicyReviewItem[];
    /** 保费总额 */
    allPremium: number | string;

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private router: Router,
        private localCache: LocalStorageService,
        private policyReviewService: PolicyReviewService,
        private apiService: ApiService,
        private el: ElementRef
    ) {
        this.searchListItem = this.rebuildNewSearchListItem([...searchListItem]);
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        this.policyReviewList = [];
        this.salesmenList = [];
        this.pageInfo = new PaginationService({
            total: 0,
            pageSize: 10,
            pageIndex: 1
        });
        this.printList = [];
    }

    ngOnInit() {
        this.setSearchListModelValue();
        this.loadTenantList();
        this.search();
    }

    /**
     * @func
     * @desc 重新构造搜索功能
     * @param searchListItem 
     */
    rebuildNewSearchListItem(searchList: ISearchListItem[]): ISearchListItem[] {
        const tenantCodeItemIndex = searchList.findIndex(item => item.key === 'tenantCode');

        if (tenantCodeItemIndex > -1) {
            searchList[tenantCodeItemIndex]['config']['onChange'] = this.tenantCodeChange;
        }

        return searchList;
    }


    /**
     * @callback
     * @desc 店铺发生改变
     * @param searchListModel 
     * @param key 
     */
    tenantCodeChange = (searchListModelVal: ISearchListModel, key: string) => {
        this.loadSalesMember();
    }

    /**
     * @func
     * @desc 加载业务员
     */
    loadSalesMember() {
        const params = {
            tenantCode: this.searchListModel.tenantCode
        };

        this.apiService.querySaleman(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.salesmenList = res.map(item => ({
                    ...item,
                    value: item.id
                }));

                this.rebuildUserIdSearchListItem();
            }
        });
    }

    /**
     * @func
     * @desc 加载店铺
     */
    loadTenantList() {
        this.apiService.queryTenant().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                const tenantList = res.map(item => ({
                    ...item,
                    value: item.code
                }));

                const listItem = this.searchListItem.find(item => item.key === 'tenantCode');
                listItem && (listItem.config.options = tenantList);
            }
        });
    }

    /**
     * @func
     * @desc 重新构建searchListItem
     */
    rebuildUserIdSearchListItem() {
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
        this.pageInfo.pageIndex = 1;
        this.loadReviewList(params);
    }

    /**
     * @callback
     * @desc 重置搜索内容
     */
    reseat() {
        this.pageInfo.pageIndex = 1;
        this.searchListModel = {...searchListModel};
    }

    /**
     * @func
     * @desc format请求的参数
     */
    formatSearchParams(): IQueryCustomerParams {
        const { commitTime, orderTime } = this.searchListModel;
        const params = {
            ...this.searchListModel,
            commitStartDate: commitTime[0] && new Date(commitTime[0]).getTime() || null,
            commitEndDate: commitTime[1] && new Date(commitTime[1]).getTime() || null,
            orderStartDate: orderTime[0] && new Date(orderTime[0]).getTime() || null,
            orderEndDate: orderTime[1] && new Date(orderTime[1]).getTime() || null,
        };

        return params;
    }

    /**
     * @func
     * @desc 加载员工列表
     */
    loadReviewList(params: IQueryCustomerParams, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        const { pageIndex, pageSize } = this.pageInfo;
        const requestParam: ICommon = {
            ...params,
            basePageInfo: {
                pageNum: pageIndex,
                pageSize
            }
        };

        this.policyReviewService.queryOrderList(requestParam).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                if (res.list) {
                    const { list, total, allPremium } = res;
                    this.policyReviewList = list.map(item => {
                        const { commercialEndTime, compulsoryEndTime, registerTime, updateTime, orderState, orderCommitDate, orderDate } = item;
                        item['renewalStateName'] = findValueName(renewalStateList, item['renewalState']);
                        item['companyName'] = findValueName(companyList, item['companyCode']);
                        item['commercialEndTimeFormat'] = commercialEndTime && dayjs(commercialEndTime).format('YYYY-MM-DD') || '--';
                        item['compulsoryEndTimeFormat'] = compulsoryEndTime && dayjs(compulsoryEndTime).format('YYYY-MM-DD') || '--';
                        item['registerTimeFormat'] = registerTime && dayjs(registerTime).format('YYYY-MM-DD') || '--';
                        item['updateTimeFormat'] = updateTime && dayjs(updateTime).format('YYYY-MM-DD') || '--';
                        item['orderStateName'] = findValueName(internalOrderStatusList, orderState) || '--';
                        item['orderCommitTimeFormat'] = orderCommitDate && dayjs(orderCommitDate).format('YYYY-MM-DD') || '--';
                        item['orderDateTimeFormat'] = orderDate && dayjs(orderDate).format('YYYY-MM-DD') || '--';

                        return item;
                    });
                    this.pageInfo.total = total;
                    this.allPremium = allPremium;
                } else {
                    this.policyReviewList = [];
                    this.pageInfo.total = 0;
                }
                
                pageChangeType === 'pageSize' && (this.pageInfo.pageIndex = 1);
            }
        });
    }

    /**
     * @callback
     * @desc 审核
     * @param policyReviewItem 
     */
    audit(policyReviewItem: IPolicyReviewItem) {

    }

    /**
     * @callback
     * @desc 打印
     */
    print() {
        const content = this.el.nativeElement.querySelector('.print-box');
        const WindowPrt = window.open('', '_blank', 'left=0,top=0,width=600,height=auto,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(`
            <html>
                <head>
                    <style>${printStyle}</style>
                </head>
                <body>
                    ${content.innerHTML}
                    <script defer>
                        function triggerPrint(event) {
                            window.removeEventListener('load', triggerPrint, false);
                            setTimeout(function() {
                                window.print();
                                setTimeout(function() { window.close(); }, 0);
                            }, 0});
                        }
                        window.addEventListener('load', triggerPrint, false);
                    </script>
                </body>
            </html>
        `);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
    }

    /**
     * @func
     * @desc 设置搜索参数字段的值
     * @param searchListModel 
     */
    setSearchListModelValue() {
        const cacheValue = this.readPolicyReviewSearchParams();

        if (cacheValue) {
            const { searchParams, pageInfo } = cacheValue;
            Object.assign(this.searchListModel, {
                ...searchParams
            });

            const { total, pageSize, pageIndex } = pageInfo;
            this.pageInfo.total = total;
            this.pageInfo.pageSize = pageSize;
            this.pageInfo.pageIndex = pageIndex;
        }
    }

    /**
     * @func
     * @desc 缓存保单审核查询条件
     */
    savePolicyReviewSearchParams() {
        const cache = {
            searchParams: {
                ...this.searchListModel
            },
            pageInfo: {
                ...this.pageInfo
            },
            canRead: false
        };

        this.localCache.set(LocalStorageItemName.POLICYREVIEWSEARCHPARAMS, cache);
    }

    /**
     * @func
     * @desc 读取保单审核查询条件缓存
     */
    readPolicyReviewSearchParams() {
        const cache = this.localCache.get(LocalStorageItemName.POLICYREVIEWSEARCHPARAMS);
        const { canRead = false } = cache && cache['value'] || {};

        if (canRead) {
            /** 移除缓存 */
            this.localCache.remove(LocalStorageItemName.POLICYREVIEWSEARCHPARAMS);
            return cache['value'];
        }

        return null;
    }

    /**
     * @callback
     * @desc 展示详情信息
     * @param policyReviewItem 
     */
    showDetail(policyReviewItem: IPolicyReviewItem) {
        const cache = {
            originPage: 'policyReview/list',
            currentOrder: policyReviewItem
        };

        this.localCache.set(LocalStorageItemName.POLICYREVIEW, cache);
        this.savePolicyReviewSearchParams();
        this.router.navigate(['/policyReview/list/detail']);
    }

    /**
     * @callback
     * @desc 确认出单信息
     * @param policyReviewItem 
     */
    confirmOutDocInfo(policyReviewItem: IPolicyReviewItem) {
        const modal = this.modalService.create({
            nzTitle: '登记出单信息',
            nzContent: ConfirmOutDocModalComponent,
            nzComponentParams: {
                policyItem: policyReviewItem
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `通过成功`);
                this.pageInfo.pageIndex = 1;
                this.search();
            }
        });
    }

    /**
     * @callback
     * @desc 确认付款
     * @param policyReviewItem 
     */
    confirmPayment(policyReviewItem: IPolicyReviewItem) {
        this.modalService.confirm({
            nzTitle: '提示',
            nzContent: '是否确认付款？',
            nzOnOk: () => {
                const params = {
                    idList: [policyReviewItem.id],
                    type: '1'
                };

                this.policyReviewService.updateBatchCustomerOrder(params).pipe(
                    catchError(err => of(err))
                ).subscribe(res => {
                    if (!(res instanceof TypeError)) {
                        this.message.create('success', '确认成功');
                        this.pageInfo.pageIndex = 1;
                        this.search();
                    }
                });
            }
        });
    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;

        const params = this.formatSearchParams();
        this.loadReviewList(params, property);
    }

    /**
     * @callback
     * @desc 选中列表中的数据
     * @param value 
     */
    checkAllList(value: boolean) {
        this.policyReviewList.forEach(item => (this.mapOfCheckedId[item.id] = value));
        this.refreshStatus();
    }

    refreshStatus() {
        this.isAllDisplayDataChecked = this.policyReviewList.every(item => this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.policyReviewList.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
        this.computedCanPrint();
        this.updatePrintListData();
    }

    /**
     * @func
     * @desc 计算canDeleteGift的值
     */
    computedCanPrint() {
        this.canPrint = this.policyReviewList.some(item => this.mapOfCheckedId[item.id]);
    }

    /**
     * @func
     * @desc 更新将要打印的数据
     */
    updatePrintListData() {
        this.printList = this.policyReviewList.filter(item => this.mapOfCheckedId[item.id]);
    }

    ngOnDestroy() {}
}
