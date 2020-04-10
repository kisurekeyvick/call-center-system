import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';

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
    constructor() {

    }

    ngOnInit() {}

    ngOnDestroy() {}
}
