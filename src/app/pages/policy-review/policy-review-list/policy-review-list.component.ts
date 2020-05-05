import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { ISearchListItem, searchListItem, ISearchListModel, IPolicyReviewItem,
    searchListModel, tableConfig, searchListLayout, renewalStateList, companyList, internalOrderStatusList } from './policy-review-list.component.config';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { ConfirmOutDocModalComponent } from '../modal/confirm-outDoc/confirm-outDoc-modal.component';
import { PolicyReviewService, IQueryCustomerParams } from '../policy-review.service';
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

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private router: Router,
        private localCache: LocalStorageService,
        private policyReviewService: PolicyReviewService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        this.policyReviewList = [];
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

        this.loadReviewList(params);
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
                    const { list, total } = res;
                    this.policyReviewList = list.map(item => {
                        const { commercialEndTime, compulsoryEndTime, registerTime, updateTime, orderState } = item;
                        item['renewalStateName'] = findValueName(renewalStateList, item['renewalState']);
                        item['lastCompanyName'] = findValueName(companyList, item['lastCompanyCode']);
                        item['commercialEndTimeFormat'] = commercialEndTime && dayjs(commercialEndTime).format('YYYY-MM-DD HH:mm:ss') || '--';
                        item['compulsoryEndTimeFormat'] = compulsoryEndTime && dayjs(compulsoryEndTime).format('YYYY-MM-DD HH:mm:ss') || '--';
                        item['registerTimeFormat'] = registerTime && dayjs(registerTime).format('YYYY-MM-DD HH:mm:ss') || '--';
                        item['updateTimeFormat'] = updateTime && dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss') || '--';
                        item['orderStateName'] = findValueName(internalOrderStatusList, orderState) || '--';
                        return item;
                    });
                    this.pageInfo.total = total;
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
     * @desc 展示详情信息
     * @param policyReviewItem 
     */
    showDetail(policyReviewItem: IPolicyReviewItem) {
        const cache = {
            originPage: 'policyReview/list',
            currentOrder: policyReviewItem
        };

        this.localCache.set(LocalStorageItemName.POLICYREVIEW, cache);
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

    ngOnDestroy() {}
}
