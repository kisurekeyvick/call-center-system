import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { DataReportService } from '../data-report.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as echarts from 'echarts'

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
    chartDOM: HTMLDivElement ;

    constructor(
        private dataReportService: DataReportService,
        private el: ElementRef
    ) {

    }

    ngOnInit() {
        this.chartDOM = this.el.nativeElement.querySelector('#echartsContainer');
        this.loadFailReasonReport();
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
            if (!(res instanceof TypeError)) {
                const result = [
                    {
                        "failReasonList":[
                            {
                                "failReason":"原因1",
                                "failId": 1,
                                "number":1
                            }
                        ],
                        "userId":189,
                        "userName":"业务员1"
                    },
                    {
                        "failReasonList":[
                            {
                                "failReason":"原因1",
                                "failId": 1,
                                "number":1
                            },
                            {
                                "failReason":"原因2",
                                "failId": 2,
                                "number":2
                            }
                        ],
                        "userId":190,
                        "userName":"业务员2"
                    },
                    {
                        "failReasonList":[
                            {
                                "failReason":"原因3",
                                "number":3,
                                "failId": 3,
                            },
                            {
                                "failReason":"原因kkks",
                                "number":12,
                                "failId": 4,
                            },
                            {
                                "failReason":"原因 nice fish",
                                "number":122,
                                "failId": 5,
                            }
                        ],
                        "userId":191,
                        "userName":"业务员3"
                    },
                    {
                        "failReasonList":[
                            {
                                "failReason":"原因2",
                                "number":40,
                                "failId": 2,
                            },
                            {
                                "failReason":"原因6",
                                "number":45,
                                "failId": 6,
                            }
                        ],
                        "userId":191,
                        "userName":"业务员4"
                    }
                ];
                this.buildEchartReport(result);
            }
        });
    }

    /**
     * @func
     * @desc 构建echart报表
     * @param res 
     */
    buildEchartReport(res: Array<any>) {
        const myChart = echarts.init(this.chartDOM);
        /** X轴展示战败缘由 */
        const xAxisData_salesmen = [];
        /** 顶部展示业务员 */
        const legendData_defeatReason = [];
        /** 根据战败缘由，展示每个业务员的数量 */
        const seriesData = [];
        /** 
         * X轴展示业务员
         * 顶部展示缘由
         * 以业务员为主轴 -> 展示每个业务员对应的战败缘由数量
         */
        res.forEach(item => {
            xAxisData_salesmen.push({
                name: item.userName,
                userId: item.userId
            });

            item.failReasonList.forEach(list => {
                const seriesIndex = legendData_defeatReason.findIndex(data => data.failId === item.failId);
                /** 如果不存在，则push进去 */
                if (seriesIndex === -1) {
                    legendData_defeatReason.push({
                        name: list.failReason,
                        failId: list.failId
                    });
                }
            });
        });

        legendData_defeatReason.forEach(reason => {
            const { failId, name } = reason;
            const result = {
                name, failId, stack: '总量', data: []
            };

            res.forEach(item => {
                const failReasonItem = item.failReasonList.find(list => list.failId === failId);

                if (failReasonItem) {
                    result.data.push(failReasonItem.number);
                } else {
                    result.data.push(0);
                }
            });

            seriesData.push(result);
        });

        const options: any = {
            title: {
                text: '战败分析'
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
                        str += `<br />使用"${param.seriesName}"，共计${param.value}次`;
                    });
                    return str;
                }
            },
            legend: {
                data: (legendData_defeatReason.map(reason => reason.name) as String[])
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
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: (xAxisData_salesmen.map(salesman => salesman.name) as String[])
            },
            yAxis: {
                type: 'value'
            },
            series: seriesData.map(serie => ({
                name: serie.name,
                type: 'line',
                areaStyle: {},
                data: serie.data
            }))
        };

        myChart.setOption(options);
    }

    ngOnDestroy() {}
}
