import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { DataReportService } from '../data-report.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as echarts from 'echarts';
import { ISearchListItem, ISearchListModel, searchListItem,
    searchListModel, searchListLayout, IChartData, ITableData } from './kpi-analysis.component.config';
import { NzMessageService } from 'ng-zorro-antd';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'kpi-analysis-report',
    templateUrl: './kpi-analysis.component.html',
    styleUrls: ['./kpi-analysis.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class KpiAnalysisReportComponent implements OnInit, OnDestroy {
    /** 是否正在加载 */
    isLoading: boolean;
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    searchListLayout: ICommon;
    /** 是否存在数据 */
    exitData: boolean;
    tableData: ITableData;

    constructor(
        private dataReportService: DataReportService,
        private el: ElementRef,
        private message: NzMessageService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        this.exitData = false;
    }

    ngOnInit() {
        // this.search();
        this.tableData = {
            header: [],
            body: []
        };
    }

    /**
     * @callback
     * @desc 搜索
     */
    search() {
        const params = this.formatSearchParams();

        if (params.month === null && params.year === null) {
            this.message.warning('时间为必选条件');
            return;
        }

        this.loadBattle(params);
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
        const dateTime = time && new Date(time) || null;

        return {
            year: dateTime && dateTime.getFullYear() || null,
            month: dateTime && dateTime.getMonth() + 1 || null,
        };
    }

    /**
     * @callback
     * @desc 加载战报
     */
    loadBattle(params) {
        this.isLoading = true;

        this.dataReportService.queryBattle(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                res.header.length > 0 && (this.exitData = true) || (this.exitData = false);
                // this.buildEchartReport(res);
                this.formatReportData(res);
            } else {
                this.exitData = false;
            }
        });
    }

    /**
     * @func
     * @desc 构建table数据
     * @param res 
     */
    formatReportData(res: IChartData) {
        const { body, header } = res;
        this.tableData.header = header;
        this.tableData.body = body;
    }

    /**
     * @func
     * @desc 构建echart报表
     * @param res 
     */
    buildEchartReport(res: IChartData) {
        const dom: HTMLDivElement = this.el.nativeElement.querySelector('#echartsContainer');
        const myChart = echarts.init(dom);
        /** X轴展示day */
        const xAxisData_day = [];
        /** 顶部展示业务员 */
        let legendData_salesmen = [];
        /** 根据业务员，展示每个业务员的战绩 */
        const seriesData = [];

        const { body, header } = res;
        legendData_salesmen = header;

        body.forEach(item => {
            xAxisData_day.push(`${item.days}日`);
        });

        legendData_salesmen.forEach(salesman => {
            const { userName, userId } = salesman;
            const result = {
                name: userName, stack: '总量', data: []
            };

            body.forEach(item => {
                const { columns } = item;

                for (const { id, value } of columns) {
                    if (id === userId) {
                        result.data.push(value);
                        break;
                    }
                }
            });

            seriesData.push(result);
        });

        const options: any = {
            title: {
                text: '战报'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter: (params: any, ticket: string, callback: (ticket: string, html: string) => {}) => {
                    let str = `${params[0] && params[0]['axisValue'] || ''}`;
                    (params as Array<any>).forEach(param => {
                        str += `<br />业务员："${param.seriesName}"，当月数量${param.value}`;
                    });
                    return str;
                }
            },
            legend: {
                data: (legendData_salesmen.map(reason => reason.userName) as String[])
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: [{
                type: 'category',
                data: xAxisData_day
            }],
            yAxis: [{
                type: 'value'
            }],
            series: seriesData.map(serie => ({
                name: serie.name,
                type: 'bar',
                areaStyle: {},
                data: serie.data
            }))
        };

        myChart.setOption(options);
    }

    ngOnDestroy() {}
}
