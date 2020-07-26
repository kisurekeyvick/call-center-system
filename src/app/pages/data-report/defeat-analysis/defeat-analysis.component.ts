import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { DataReportService } from '../data-report.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import * as echarts from 'echarts';
import { ISource, IDefeatReasonItem, ITableBodyItem, ITable } from './defeat-analysis.component.config';

@Component({
    selector: 'defeat-analysis-report',
    templateUrl: './defeat-analysis.component.html',
    styleUrls: ['./defeat-analysis.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class DefeatAnalysisReportComponent implements OnInit, OnDestroy {
    /** 是否正在加载 */
    isLoading: boolean;
    /** chartDOM容器 */
    // chartDOM: HTMLDivElement ;
    /** table数据 */
    tableList: ITable;
    /** 战败原因 */
    defeatReasonList: IDefeatReasonItem[];

    constructor(
        private dataReportService: DataReportService,
        private el: ElementRef
    ) {
        this.tableList = {
            head: [],
            body: []
        };
        this.defeatReasonList = [];
    }

    ngOnInit() {
        // this.chartDOM = this.el.nativeElement.querySelector('#echartsContainer');
        this.queryTotalDefeatReasonList().then(() => {
            this.loadFailReasonReport();
        });
    }

    /**
     * @func
     * @desc 查询所有的战败原因
     */
    queryTotalDefeatReasonList() {
        return new Promise((resolve) => {
            this.dataReportService.queryTotalDefeatReasonList().pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    this.defeatReasonList = res;
                    resolve(res);
                }
            });
        });
    }

    /**
     * @func
     * @esc 加载战败原因报表
     */
    loadFailReasonReport() {
        this.isLoading = true;

        this.dataReportService.queryFailReasonList().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;
            
            if (!(res instanceof TypeError)) {
                this.formatResponseData(res);
            }
        });
    }

    /**
     * @func
     * @desc 整理请求参数
     * @param source 
     */
    formatResponseData(source: ISource[]) {
        this.tableList.body = this.defeatReasonList.map(defeat => {
            const { defeatReason } = defeat;
            const item = {
                defeatReason,
                userInfo: []
            };

            source.forEach((sourceItem: ISource) => {
                const { userName, failReasonList } = sourceItem;
                const target = (failReasonList || []).find(failReason => failReason.failReason === defeatReason);
                item['userInfo'].push({ userName, number: target && target.number || 0 });
            });

            return item;
        });

        this.tableList.head = source.map((sourceItem: ISource) => {
            const { failReasonList = [] } = sourceItem;
            const summary: number = failReasonList.reduce((pre, cur) => {
                const { number } = cur;
                pre += number;
                return pre;
            }, 0);

            return { 
                userName: sourceItem.userName,
                userSummary: summary
            };
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
    //     const xAxisData_salesmen = [];
    //     /** 顶部展示业务员 */
    //     const legendData_defeatReason = [];
    //     /** 根据战败缘由，展示每个业务员的数量 */
    //     const seriesData = [];
    //     /** 
    //      * X轴展示业务员
    //      * 顶部展示缘由
    //      * 以业务员为主轴 -> 展示每个业务员对应的战败缘由数量
    //      */
    //     res.forEach(item => {
    //         xAxisData_salesmen.push({
    //             name: item.userName,
    //             userId: item.userId
    //         });

    //         (item.failReasonList || []).forEach(list => {
    //             // const seriesIndex = legendData_defeatReason.findIndex(data => data.failId === item.failId);
    //             const seriesIndex = legendData_defeatReason.findIndex(data => data.name === list.failReason);
    //             /** 如果不存在，则push进去 */
    //             if (seriesIndex === -1) {
    //                 legendData_defeatReason.push({
    //                     name: list.failReason,
    //                     // failId: list.failId
    //                 });
    //             }
    //         });
    //     });

    //     legendData_defeatReason.forEach(reason => {
    //         const { name } = reason;
    //         const result = {
    //             name, stack: '总量', data: []
    //         };

    //         res.forEach(item => {
    //             const failReasonItem = (item.failReasonList || []).find(list => list.failReason === name);

    //             if (failReasonItem) {
    //                 result.data.push(failReasonItem.number);
    //             } else {
    //                 result.data.push(0);
    //             }
    //         });

    //         seriesData.push(result);
    //     });

    //     const options: any = {
    //         title: {
    //             text: '战败分析'
    //         },
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'cross',
    //                 label: {
    //                     backgroundColor: '#6a7985'
    //                 }
    //             },
    //             formatter: (params: any, ticket: string, callback: (ticket: string, html: string) => {}) => {
    //                 let str = `${params[0] && params[0]['axisValue'] || ''}`;
    //                 (params as Array<any>).forEach(param => {
    //                     str += `<br />使用战败原因："${param.seriesName}"，共计${param.value}次`;
    //                 });
    //                 return str;
    //             }
    //         },
    //         legend: {
    //             data: (legendData_defeatReason.map(reason => reason.name) as String[])
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
