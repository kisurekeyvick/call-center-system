import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';

@Component({
    selector: 'summary-list',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class SummaryComponent implements OnInit, OnDestroy {
    /** 已跟踪 */
    trackedNum: number;
    /** 未跟踪 */
    untrackedNum: number;
    /** 已处理 */
    todayHandleNum: number;
    /** 未处理 */
    notHandleNum: number;

    constructor() {
        this.trackedNum = 0;
        this.untrackedNum = 0;
        this.todayHandleNum = 0;
        this.notHandleNum = 0;
    }

    ngOnInit() {}

    ngOnDestroy() {}
}
