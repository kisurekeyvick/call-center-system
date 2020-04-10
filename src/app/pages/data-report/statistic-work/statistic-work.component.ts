import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';

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
    constructor() {

    }

    ngOnInit() {}

    ngOnDestroy() {}
}
