import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { ISearchListItem, searchListItem, ISearchListModel, IPolicyReviewItem,
    searchListModel, tableConfig, listValue } from './policy-review-list.component.config';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { ConfirmOutDocModalComponent } from '../modal/confirm-outDoc/confirm-outDoc-modal.component';

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
        private localCache: LocalStorageService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.policyReviewList = [];
        this.pageInfo = new PaginationService({
            total: 200,
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
        this.loadReviewList({});
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
    loadReviewList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        
        setTimeout(() => {
            this.policyReviewList = listValue();
            this.isLoading = false;

            if (pageChangeType === 'pageSize') {
                this.pageInfo.pageIndex = 1;
            }
        }, 2000);
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
        // const cache = {
        //     originPage: 'customer/list',
        //     customerListCache: this.customerList,
        //     currentCustomer: customer
        // };

        // this.localCache.set(LocalStorageItemName.CUSTOMERDETAIL, cache);
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

        this.loadReviewList({}, property);
    }

    ngOnDestroy() {}
}
