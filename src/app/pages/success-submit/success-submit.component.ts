import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { ISearchListItem, searchListItem, tableConfig, ISearchListModel, 
    searchListModel, ISuccessSubmitListItem, ISalesman, searchListLayout,
    renewalStateList, companyList, internalOrderStatusList } from './success-submit.component.config';
import { Router } from '@angular/router';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { SuccessSubmitService, IQueryCustomerParams } from './success-submit.service';
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
    selector: 'success-submit-list',
    templateUrl: './success-submit.component.html',
    styleUrls: ['./success-submit.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class SuccessSubmitComponent implements OnInit, OnDestroy {
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    searchListLayout: ICommon;
    /** 成功保单列表展示 */
    successSubmitList: ISuccessSubmitListItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConfig;
    /** 分页 */
    pageInfo: PaginationService;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 业务员 */
    salesmenList: ISalesman[];

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService,
        private router: Router,
        private localCache: LocalStorageService,
        private successSubmitService: SuccessSubmitService,
        private apiService: ApiService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        this.successSubmitList = [];
        this.salesmenList = [];
        this.pageInfo = new PaginationService({
            total: 0,
            pageSize: 10,
            pageIndex: 1
        });
    }

    ngOnInit() {
        this.setSearchListModelValue();
        this.loadSalesMember();
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

        this.loadSuccessSubmitList(params);
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
     * @desc 加载保单列表
     * @param params 
     * @param pageChangeType 
     */
    loadSuccessSubmitList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        const { pageIndex, pageSize } = this.pageInfo;
        const requestParam: ICommon = {
            ...params,
            basePageInfo: {
                pageNum: pageIndex,
                pageSize
            }
        };

        this.successSubmitService.queryOrderList(requestParam).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                if (res.list) {
                    const { list, total } = res;
                    this.successSubmitList = list.map(item => {
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
                } else {
                    this.successSubmitList = [];
                    this.pageInfo.total = 0;
                }
                
                pageChangeType === 'pageSize' && (this.pageInfo.pageIndex = 1);
            }
        });
    }

    /**
     * @func
     * @desc 设置搜索参数字段的值
     * @param searchListModel 
     */
    setSearchListModelValue() {
        const cacheValue = this.readSuccesssubmitSearchParams();

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
    saveSuccesssubmitSearchParams() {
        const cache = {
            searchParams: {
                ...this.searchListModel
            },
            pageInfo: {
                ...this.pageInfo
            },
            canRead: false
        };

        this.localCache.set(LocalStorageItemName.SUCCESSSUBMISEARCHPARAMS, cache);
    }

    /**
     * @func
     * @desc 读取保单审核查询条件缓存
     */
    readSuccesssubmitSearchParams() {
        const cache = this.localCache.get(LocalStorageItemName.SUCCESSSUBMISEARCHPARAMS);
        const { canRead = false } = cache && cache['value'] || {};

        if (canRead) {
            /** 移除缓存 */
            this.localCache.remove(LocalStorageItemName.SUCCESSSUBMISEARCHPARAMS);
            return cache['value'];
        }

        return null;
    }

    /**
     * @callback
     * @desc 展示详情信息
     * @param policyReviewItem 
     */
    showDetail(successSubmitItem: ISuccessSubmitListItem) {
        const cache = {
            originPage: 'successSubmit',
            currentOrder: successSubmitItem
        };

        this.localCache.set(LocalStorageItemName.SUCCESSSUBMITREVIEW, cache);
        this.saveSuccesssubmitSearchParams();
        this.router.navigate(['/successSubmit/list/detail']);
    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;

        const params = this.formatSearchParams();
        this.loadSuccessSubmitList(params, property);
    }

    ngOnDestroy() {}
}
