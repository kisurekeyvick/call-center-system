import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { DataReportService } from '../data-report.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import * as echarts from 'echarts';
import { ISource, ITable, ITableBodyItem } from './statistic-work.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';

@Component({
    selector: 'statistic-work-report',
    templateUrl: './statistic-work.component.html',
    styleUrls: ['./statistic-work.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class StatisticWorkReportComponent implements OnInit, OnDestroy {
    /** 是否正在加载 */
    isLoading: boolean;
    /** chartDOM容器 */
    // chartDOM: HTMLDivElement ;
    tableList: ITable;
    /** 预约级别 */
    appointmentLevelList = dictionary.get('appointmentLevel');

    constructor(
        private dataReportService: DataReportService,
        private el: ElementRef
    ) {
        this.tableList = {
            head: [],
            body: []
        };
    }

    ngOnInit() {
        // this.chartDOM = this.el.nativeElement.querySelector('#echartsContainer');
        this.loadCustomerStatistics();
    }

    /**
     * @func
     * @desc 加载客户分布统计
     */
    loadCustomerStatistics() {
        this.isLoading = true;

        this.dataReportService.queryCustomerStatistics().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                // this.buildEchartReport(res);
                this.formatResponseData(res);
            }
        });
    }

    /**
     * @func
     * @desc 整合返回的参数
     * @param source 
     */
    formatResponseData(source: ISource[]) {
        this.tableList.body = this.appointmentLevelList.map((level: { name: string; value: string; }) => {
            const { value } = level;
            const item = {
                customerLevel: value,
                userInfo: []
            };

            source.forEach((sourceItem: ISource) => {
                const { userName, customerStatisticsList } = sourceItem;
                const target = (customerStatisticsList || []).find(staticItem => staticItem.levelName === value);
                item.userInfo.push({ userName, number: target && target.number || 0 });
            });

            return item;
        });

        this.tableList.head = source.map((sourceItem: ISource) => ({ userName: sourceItem.userName}));
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
    //     /** 顶部展示客户级别 */
    //     const legendData_customerLevel = [];
    //     /** 根据客户级别，展示每个业务员的数量 */
    //     const seriesData = [];

    //     res.forEach(item => {
    //         xAxisData_salesmen.push({
    //             name: item.userName,
    //             userId: item.userId
    //         });

    //         (item.customerStatisticsList || []).forEach(list => {
    //             const seriesIndex = legendData_customerLevel.findIndex(level => level.name === list.levelName);
    //             /** 如果不存在，则push进去 */
    //             if (seriesIndex === -1) {
    //                 legendData_customerLevel.push({
    //                     name: list.levelName
    //                 });
    //             }
    //         });
    //     });

    //     legendData_customerLevel.forEach(level => {
    //         const { name } = level;
    //         const result = {
    //             name, stack: '总量', data: []
    //         };

    //         res.forEach(item => {
    //             const levelNameItem = (item.customerStatisticsList || []).find(list => list.levelName === name);

    //             if (levelNameItem) {
    //                 result.data.push(levelNameItem.number);
    //             } else {
    //                 result.data.push(0);
    //             }
    //         });

    //         seriesData.push(result);
    //     });

    //     const options: any = {
    //         title: {
    //             text: '客户分布详情'
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
    //                     str += `<br />客户级别："${param.seriesName}"，共计${param.value}个`;
    //                 });
    //                 return str;
    //             }
    //         },
    //         legend: {
    //             data: (legendData_customerLevel.map(reason => reason.name) as String[])
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
