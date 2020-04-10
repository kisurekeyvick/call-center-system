import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';

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
    constructor() {

    }

    ngOnInit() {}

    ngOnDestroy() {}
}
