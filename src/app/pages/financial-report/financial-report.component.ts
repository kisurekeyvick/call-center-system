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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

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
    // salesmenList: ISalesman[];
    /** 表单 */
    validateForm: FormGroup;
    /** 表单选项列表 */
    formList = {
        insuranceCompanysList: [...companyList],
        salesmenList: [],
        tenantCodeList: []
    };

    constructor(
        private financialReportService: FinancialReportService,
        private apiService: ApiService,
        private utilsService: UtilsService,
        private fb: FormBuilder,
        private message: NzMessageService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        // this.salesmenList = [];
        this.queryList = [];
        this.pageInfo = new PaginationService({
            total: 0,
            pageSize: 10,
            pageIndex: 1
        });
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            /** 姓名 */
            customerName: [null],
            /** 车牌 */
            carNo: [null],
            /** 投保公司 */
            companyCode: [null],
            /** 业务员 */
            userId: [null],
            /** 提交日期 */
            commitTime: [[]],
            /** 出单日期 */
            orderTime: [[]],
            /** 店铺 */
            tenantCode: [null],

            /** 交强险基础比例 */
            compulsoryRatio: [0.04, [Validators.required]],
            /** 交强险加投比例 */
            compulsoryAdditionRatio: [0.26, [Validators.required]],
            /** 商业险基础比例 */
            commercialRatio: [0.2, [Validators.required]],
            /** 商业险加投比例 */
            commercialAdditionRatio: [0.1, [Validators.required]],
            /** 驾意险政策 */
            drivingRatio: [0.3, [Validators.required]],
            /** 津贴宝政策 */
            allowanceRatio: [0.3, [Validators.required]],
            /** 玻璃膜政策 */
            glassRatio: [0.3, [Validators.required]],
            /** 基础计算比例 */
            baseRatio: [1.06, [Validators.required]],
            /** 奖励 */
            reward: [1, [Validators.required]]
        });

        this.loadSalesMember();
        this.loadTenantList();
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
                this.formList.salesmenList = res.map(item => ({
                    ...item,
                    value: item.id
                }));

                // this.rebuildSearchListItem();
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
                this.formList.tenantCodeList = res.map(item => ({
                    ...item,
                    value: item.code
                }));
            }
        });
    }


    // /**
    //  * @func
    //  * @desc 重新构建searchListItem
    //  */
    // rebuildSearchListItem() {
    //     const userIdItemIndex = this.searchListItem.findIndex(item => item.key === 'userId');

    //     if (userIdItemIndex > -1) {
    //         this.searchListItem[userIdItemIndex]['config']['options'] = this.salesmenList;
    //     }
    // }

    /**
     * @callback
     * @desc 搜索
     */
    search() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.valid) {
            const params = this.formatSearchParams();

            this.loadFinanceList(params);
        } else {
            this.message.warning('红框选项都是必填项，请填写完整');
        }
    }

    /**
     * @callback
     * @desc 重置
     */
    reset() {
        // this.searchListModel = {...searchListModel};
        this.validateForm.patchValue({
            /** 姓名 */
            customerName: null,
            /** 车牌 */
            carNo: null,
            /** 投保公司 */
            companyCode: null,
            /** 业务员 */
            userId: null,
            /** 提交日期 */
            commitTime: [],
            /** 出单日期 */
            orderTime: [],
            /** 店铺 */
            tenantCode: null,
            /** 交强险基础比例 */
            compulsoryRatio: 0.1,
            /** 交强险加投比例 */
            compulsoryAdditionRatio: 0.1,
            /** 商业险基础比例 */
            commercialRatio: 0.1,
            /** 商业险加投比例 */
            commercialAdditionRatio: 0.1,
            /** 驾意险政策 */
            drivingRatio: 0.1,
            /** 津贴宝政策 */
            allowanceRatio: 0.1,
            /** 玻璃膜政策 */
            glassRatio: 0.1,
            /** 基础计算比例 */
            baseRatio: 1.06,
            /** 奖励 */
            reward: 1
        });
    }

    /**
     * @func
     * @desc format请求的参数
     */
    formatSearchParams(): IQueryCustomerParams {
        const { customerName, carNo, companyCode, userId, commitTime, orderTime, 
            compulsoryRatio, compulsoryAdditionRatio, commercialRatio, commercialAdditionRatio,
            drivingRatio, allowanceRatio, glassRatio, baseRatio, reward, tenantCode } = this.validateForm.value;

        const params = {
            query: {
                customerName, carNo, companyCode, userId, tenantCode,
                commitStartDate: commitTime[0] && new Date(commitTime[0]).getTime() || null,
                commitEndDate: commitTime[1] && new Date(commitTime[1]).getTime() || null,
                orderStartDate: orderTime[0] && new Date(orderTime[0]).getTime() || null,
                orderEndDate: orderTime[1] && new Date(orderTime[1]).getTime() || null,
            },
            reportParam: {
                compulsoryRatio, compulsoryAdditionRatio, commercialRatio, commercialAdditionRatio,
                drivingRatio, allowanceRatio, glassRatio, baseRatio, reward
            }
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
                ...params.query,
                basePageInfo: {
                    pageNum: pageIndex,
                    pageSize
                }
            },
            reportParam: {
                ...params.reportParam
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
