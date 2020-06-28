import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { DataReportService } from '../data-report.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import * as echarts from 'echarts';
import { kpiParams, ISearchListItem, ISearchListModel, searchListItem,
    searchListModel, searchListLayout, ISource } from './success-submit-analysis.component.config';

interface ICommon {
    [key: string]: any;
}

type ITableHead = typeof kpiParams;

@Component({
    selector: 'success-submit-analysis-report',
    templateUrl: './success-submit-analysis.component.html',
    styleUrls: ['./success-submit-analysis.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class SuccessSubmitAnalysisReportComponent implements OnInit, OnDestroy {
    /** 是否正在加载 */
    isLoading: boolean = false;
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    searchListLayout: ICommon;
    /** table数据 */
    sourceList: ISource[];
    /** table列表配置 */
    tableCfg: ITableHead = kpiParams;

    constructor(
        private dataReportService: DataReportService,
        private el: ElementRef
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        this.sourceList = [];
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

        this.loadSuccessRate(params);
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
    formatSearchParams() {
        const { time } = this.searchListModel;

        return {
            startDate: time[0] && new Date(time[0]).getTime() || null,
            endDate: time[1] && new Date(time[1]).getTime() || null,
        };
    }

    /**
     * @func
     * @desc 加载业务员排名
     */
    loadSuccessRate(params) {
        this.isLoading = true;

        this.dataReportService.querySuccessRate(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                // this.buildEchartReport(res);
                this.sourceList = res;
            }
        });
    }

    /**
     * @func
     * @desc 构建echart报表
     * @param res 
     */
    // buildEchartReport(res: Array<any>) {
    //     const dom: HTMLDivElement = this.el.nativeElement.querySelector('#echartsContainer');
    //     const myChart = echarts.init(dom);
    //     /** X轴展示业务员 */
    //     let xAxisData_salesmen = [];
    //     /** 顶部展示各个KPI项 */
    //     const legendData_rateParams = [...kpiParams];
    //     /** 根据客户各个KPI项，展示每个业务员的战绩 */
    //     const seriesData = [];

    //     xAxisData_salesmen = res.map(item => ({
    //         name: item.userName,
    //         userId: item.userId
    //     }));

    //     legendData_rateParams.forEach(kpi => {
    //         const { name, code } = kpi;
    //         const result = {
    //             name, stack: '总量', data: []
    //         };

    //         res.forEach(item => {
    //             result.data.push(item[code]);
    //         });

    //         seriesData.push(result);
    //     });
        

    //     const options: any = {
    //         title: {
    //             text: '业务员排名'
    //         },
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'cross',
    //                 label: {
    //                     backgroundColor: '#6a7985'
    //                 }
    //             },
    //             // formatter: (params: any, ticket: string, callback: (ticket: string, html: string) => {}) => {
    //             //     let str = `${params[0] && params[0]['axisValue'] || ''}`;
    //             //     (params as Array<any>).forEach(param => {
    //             //         str += `<br />"${param.seriesName}"，共计${param.value}个`;
    //             //     });
    //             //     return str;
    //             // }
    //         },
    //         legend: {
    //             data: (legendData_rateParams.map(kpi => kpi.name) as String[])
    //         },
    //         grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '3%',
    //             containLabel: true
    //         },
    //         toolbox: {
    //             feature: {
    //                 saveAsImage: {}
    //             }
    //         },
    //         xAxis: {
    //             type: 'category',
    //             boundaryGap: false,
    //             data: (xAxisData_salesmen.map(salesman => salesman.name) as String[])
    //         },
    //         yAxis: {
    //             type: 'value'
    //         },
    //         series: seriesData.map(serie => ({
    //             name: serie.name,
    //             type: 'line',
    //             areaStyle: {},
    //             data: serie.data
    //         }))
    //     };

    //     myChart.setOption(options);
    // }

    ngOnDestroy() {}
}
