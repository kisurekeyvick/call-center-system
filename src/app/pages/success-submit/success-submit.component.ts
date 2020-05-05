import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { ISearchListItem, searchListItem, tableConfig, ISearchListModel, 
    searchListModel, ISuccessSubmitListItem, ISalesman, searchListLayout,
    renewalStateList, companyList } from './success-submit.component.config';
import { Router } from '@angular/router';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { SuccessSubmitService, IQueryCustomerParams } from './success-submit.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { findValueName } from 'src/app/core/utils/function';
import * as dayjs from 'dayjs';

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
        private successSubmitService: SuccessSubmitService
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
        this.search();
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
        this.searchListModel = {...searchListModel};
    }

    /**
     * @func
     * @desc format请求的参数
     */
    formatSearchParams(): IQueryCustomerParams {
        const { registerTime } = this.searchListModel;
        const params = {
            ...this.searchListModel,
            startRegisterTime: registerTime[0] && new Date(registerTime[0]).getTime() || null,
            endRegisterTime: registerTime[1] && new Date(registerTime[1]).getTime() || null,
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
                        const { commercialEndTime, compulsoryEndTime, registerTime, updateTime } = item;
                        item['renewalStateName'] = findValueName(renewalStateList, item['renewalState']);
                        item['lastCompanyName'] = findValueName(companyList, item['lastCompanyCode']);
                        item['commercialEndTimeFormat'] = commercialEndTime && dayjs(commercialEndTime).format('YYYY-MM-DD HH:mm:ss') || '--';
                        item['compulsoryEndTimeFormat'] = compulsoryEndTime && dayjs(compulsoryEndTime).format('YYYY-MM-DD HH:mm:ss') || '--';
                        item['registerTimeFormat'] = registerTime && dayjs(registerTime).format('YYYY-MM-DD HH:mm:ss') || '--';
                        item['updateTimeFormat'] = updateTime && dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss') || '--';
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
        this.router.navigate(['/successSubmit/list/detail']);
    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;

        this.loadSuccessSubmitList({}, property);
    }

    ngOnDestroy() {}
}
