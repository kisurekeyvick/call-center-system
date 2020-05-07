import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { DataReportService } from '../data-report.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

    constructor(
        private dataReportService: DataReportService
    ) {

    }

    ngOnInit() {
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
                console.log('获取数据', res);
            }
        });
    }

    ngOnDestroy() {}
}
