import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';

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
    constructor() {

    }

    ngOnInit() {}

    ngOnDestroy() {}
}
