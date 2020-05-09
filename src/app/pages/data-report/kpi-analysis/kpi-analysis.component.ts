import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { DataReportService } from '../data-report.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as echarts from 'echarts';
import { ISearchListItem, ISearchListModel, searchListItem,
    searchListModel, searchListLayout } from './kpi-analysis.component.config';
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
                // this.buildEchartReport(res);
            }
        });
    }

    /**
     * @func
     * @desc 构建echart报表
     * @param res 
     */
    buildEchartReport(res: ICommon) {
        const dom: HTMLDivElement = this.el.nativeElement.querySelector('#echartsContainer');
        const myChart = echarts.init(dom);

        const options: any = {};

        myChart.setOption(options);
    }

    ngOnDestroy() {}
}
