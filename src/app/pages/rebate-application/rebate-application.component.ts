import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { tableConifg, ISearchListItem, ISearchListModel, searchListItem, 
    searchListModel, IRebateApplicationItem, searchListLayout, insuranceCompanysList,
    rebateApplicationStatusList, carTypeList } from './rebate-application.component.config';
import { RebateApplicationService } from './rebate-application.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/api/api.service';
import { findValueName } from 'src/app/core/utils/function';
import * as dayjs from 'dayjs';

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
    searchListLayout: ICommon;
    /** 列表展示数据 */
    rebateApplicationList: IRebateApplicationItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;
    /** 分页 */
    pageInfo: PaginationService;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 申请人(业务员) */
    salesmenList: ICommon[];
    /** 保费总额 */
    allpremium: number | string;

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService,
        private rebateApplicationService: RebateApplicationService,
        private apiService: ApiService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        this.rebateApplicationList = [];
        this.salesmenList = [];
        this.pageInfo = new PaginationService({
            total: 0,
            pageSize: 10,
            pageIndex: 1
        });
        this.isLoading = false;
    }

    ngOnInit() {
        this.loadSalesmen();
        this.search();
    }

    /**
     * @func
     * @desc 加载业务员
     */
    loadSalesmen() {
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
     * @desc 重新构造searchListItem
     */
    rebuildSearchListItem() {
        const target = this.searchListItem.find(item => item.key === 'userId');
        target && (target.config.options = this.salesmenList);
    }

    /**
     * @callback
     * @desc 搜索
     */
    search() {
        const params = this.formatSearchParams();

        this.loadRebateApplicationList(params);
    }

    /**
     * @callback
     * @desc 撤销
     */
    reseat() {
        this.searchListModel = {...searchListModel};
    }

    /**
     * @func
     * @desc format请求的参数
     */
    formatSearchParams() {
        const { createDate } = this.searchListModel;
        const params = {
            ...this.searchListModel,
            startDate: createDate[0] && new Date(createDate[0]).getTime() || null,
            endDate: createDate[1] && new Date(createDate[1]).getTime() || null,
        };

        return params;
    }

    /**
     * @func
     * @desc 加载返利申请列表
     * @param params 
     * @param pageChangeType 
     */
    loadRebateApplicationList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        const { pageIndex, pageSize } = this.pageInfo;
        const requestParam: ICommon = {
            ...params,
            basePageInfo: {
                pageNum: pageIndex,
                pageSize
            }
        };

        this.rebateApplicationService.queryRebateList(requestParam).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                const { list, total, allpremium } = res;
                const salesmenList = this.salesmenList.map(item => ({
                    name: item.name,
                    value: item.value
                }));
                this.rebateApplicationList = list.map(item => {
                    const { companyCode, orderState, userId, carTypeCode, applyDate } = item;
                    item['companyName'] = findValueName(insuranceCompanysList, companyCode);
                    item['orderStateName'] = findValueName(rebateApplicationStatusList, orderState);
                    // item['carTypeCodeName'] = findValueName(carTypeList, carTypeCode);
                    item['applyDateFormat'] = applyDate && dayjs(applyDate).format('YYYY-MM-DD HH:mm:ss') || '--';
                    return item;
                });

                this.pageInfo.total = total;
                this.allpremium = allpremium;
                pageChangeType === 'pageSize' && (this.pageInfo.pageIndex = 1);
            }
        });
    }

    /**
     * @desc operationCode字段
     *      '2' => 内勤通过
     *      '3' => 内勤审评失败
     *      '7' => 返利申请被拒绝
     *      '8' => 返利申请同意
     */

    /**
     * @callback
     * @desc 同意申请
     * @param application 
     */
    agreeApplication(application:IRebateApplicationItem) {
        const params = {
            operationCode: '8',
            customerOrder: {
                ...application
            }
        };

        this.rebateApplicationService.operationOrder(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.message.success('申请通过');
                this.pageInfo.pageIndex = 1;
                this.search();
            } else {
                this.message.error('操作失败');
            }
        });
    }

    /**
     * @callback
     * @desc 拒绝申请
     * @param application 
     */
    rejectApplication(application:IRebateApplicationItem) {
        this.modalService.confirm({
            nzTitle: '提示',
            nzContent: '您确定撤回吗?',
            nzOnOk: () => {
                const params = {
                    operationCode: '7',
                    customerOrder: {
                        ...application
                    }
                };

                this.rebateApplicationService.operationOrder(params).pipe(
                    catchError(err => of(err))
                ).subscribe(res => {
                    if (!(res instanceof TypeError)) {
                        this.message.success('拒绝成功');
                        this.pageInfo.pageIndex = 1;
                        this.search();
                    } else {
                        this.message.error('操作失败');
                    }
                });
            },
            nzOnCancel: () => {
                this.message.info('您已取消拒绝操作');
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
        this.loadRebateApplicationList(params, property);
    }
    
    ngOnDestroy() {}
}
