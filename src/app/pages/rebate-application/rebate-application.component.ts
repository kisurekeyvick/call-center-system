import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { tableConifg, ISearchListItem, ISearchListModel, searchListItem, 
    searchListModel, IRebateApplicationItem, listValue } from './rebate-application.component.config';

type ITableCfg = typeof tableConifg;
type pageChangeType = 'pageIndex' | 'pageSize';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'rebate-application-list',
    templateUrl: './rebate-application.component.html',
    styleUrls: ['./rebate-application.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class RebateApplicationComponent implements OnInit, OnDestroy {
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    /** 列表展示数据 */
    rebateApplicationList: IRebateApplicationItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;
    /** 分页 */
    pageInfo: PaginationService;
    /** 是否正在加载 */
    isLoading: boolean;

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.rebateApplicationList = [];
        this.pageInfo = new PaginationService({
            total: 200,
            pageSize: 10,
            pageIndex: 1
        });
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
        this.loadRebateApplicationList({});
    }

    /**
     * @callback
     * @desc 撤销
     */
    reseat() {

    }

    /**
     * @func
     * @desc 加载赠品列表
     * @param params 
     * @param pageChangeType 
     */
    loadRebateApplicationList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        
        setTimeout(() => {
            this.rebateApplicationList = listValue();
            this.isLoading = false;

            if (pageChangeType === 'pageSize') {
                this.pageInfo.pageIndex = 1;
            }
        }, 2000);
    }

    /**
     * @callback
     * @desc 同意申请
     * @param application 
     */
    agreeApplication(application:IRebateApplicationItem) {
        this.message.success('申请通过');
    }

    /**
     * @callback
     * @desc 撤销
     * @param application 
     */
    undoApplication(application:IRebateApplicationItem) {
        this.modalService.confirm({
            nzTitle: '提示',
            nzContent: '您确定撤回吗?',
            nzOnOk: () => {
                this.message.success('撤销成功');
                this.search();
            },
            nzOnCancel: () => {
                this.message.info('您已取消撤销操作');
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

        this.loadRebateApplicationList({}, property);
    }
    
    ngOnDestroy() {}
}
