import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { ISearchListItem, searchListItem, tableConfig, ISearchListModel, 
    searchListModel, ISuccessSubmitListItem, listValue, ISalesman, salemenListValue } from './success-submit.component.config';
import { ChangeBelongModalComponent } from './modal/change-belong/change-belong-modal.component';

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
        private modalService: NzModalService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.successSubmitList = [];
        this.salesmenList = [];
        this.pageInfo = new PaginationService({
            total: 200,
            pageSize: 10,
            pageIndex: 1
        });
    }

    ngOnInit() {
        this.search();
        this.loadSalesmenList();
    }

    /**
     * @callback
     * @desc 搜索
     */
    search() {
        this.loadSuccessSubmitList({});
    }

    /**
     * @callback
     * @desc 重置搜索内容
     */
    reseat() {

    }

    /**
     * @func
     * @desc 加载业务员
     */
    loadSalesmenList() {
        this.salesmenList = salemenListValue();
        const searchItem = this.searchListItem.find((item: ISearchListItem) => item.key === 'salesmanId');
        searchItem.config.options = [...this.salesmenList];
    }

    /**
     * @func
     * @desc 加载保单列表
     * @param params 
     * @param pageChangeType 
     */
    loadSuccessSubmitList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        
        setTimeout(() => {
            this.successSubmitList = listValue();
            this.isLoading = false;

            if (pageChangeType === 'pageSize') {
                this.pageInfo.pageIndex = 1;
            }
        }, 2000);
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

    /**
     * @callback
     * @desc 更改所属
     * @param successSubmitItem 
     */
    changeBelongs(successSubmitItem:ISuccessSubmitListItem) {
        const modal = this.modalService.create({
            nzTitle: '编辑提取规则',
            nzContent: ChangeBelongModalComponent,
            nzComponentParams: {
                salesmenList: this.salesmenList,
                successSubmitItem
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `更改成功`);
                this.loadSuccessSubmitList({});
            }
        });
    }

    ngOnDestroy() {}
}
