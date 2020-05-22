import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { FinancialReportService, IQueryCustomerParams } from './financial-report.service';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { ISearchListItem, searchListItem, ISearchListModel, IQueryListItem,
    searchListModel, tableConfig, searchListLayout, renewalStateList, companyList, internalOrderStatusList,
    ISalesman } from './financial-report.component.config';
import { findValueName } from 'src/app/core/utils/function';
import * as dayjs from 'dayjs';
import { ApiService } from 'src/app/api/api.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilsService } from 'src/app/core/utils/utils.service';

type ITableCfg = typeof tableConfig;
type pageChangeType = 'pageIndex' | 'pageSize';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'financial-report',
    templateUrl: './financial-report.component.html',
    styleUrls: ['./financial-report.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class FinancialReportComponent implements OnInit, OnDestroy {
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    searchListLayout: ICommon;
    /** 列表展示数据 */
    queryList: IQueryListItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConfig;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 分页 */
    pageInfo: PaginationService;
    /** 业务员 */
    salesmenList: ISalesman[];

    constructor(
        private financialReportService: FinancialReportService,
        private apiService: ApiService,
        private utilsService: UtilsService,
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        this.salesmenList = [];
        this.queryList = [];
        this.pageInfo = new PaginationService({
            total: 0,
            pageSize: 10,
            pageIndex: 1
        });
    }

    ngOnInit() {
        this.loadSalesMember();
        // this.search();
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

        this.loadFinanceList(params);
    }

    /**
     * @callback
     * @desc 重置
     */
    reseat() {
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
     * @desc 加载财务报表list
     */
    loadFinanceList(params: IQueryCustomerParams, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        const { pageIndex, pageSize } = this.pageInfo;
        const requestParam: ICommon = {
            query: {
                ...params,
                basePageInfo: {
                    pageNum: pageIndex,
                    pageSize
                }
            }
        };

        this.financialReportService.queryFinanceList(requestParam).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                if (res.list) {
                    const { list, total } = res;
                    this.queryList = list.map(item => {
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
                    this.queryList = [];
                    this.pageInfo.total = 0;
                }
                
                pageChangeType === 'pageSize' && (this.pageInfo.pageIndex = 1);
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
        this.loadFinanceList(params, property);
    }

    /**
     * @callback
     * @desc 导出财务报表
     */
    exportFinancial() {
        const params = {
            httpMethod: 'POST',
            httpUrl: 'api/finance/export',
            fileName: '财务报表',
            requestParams: this.formatSearchParams()
        };

        this.utilsService.downloadFile(params);
    }

    ngOnDestroy() {}
}
