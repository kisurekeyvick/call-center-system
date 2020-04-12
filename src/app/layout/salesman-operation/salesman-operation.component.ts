import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ITrackingListItem, trackingListValue, IRemind, remindValue, 
    defaultRemidVal, ICalendarItem, calendarValue } from './salesman-operation.component.config';

@Component({
    selector: 'salesman-operation',
    templateUrl: './salesman-operation.component.html',
    styleUrls: ['./salesman-operation.component.scss']
})
export class SalesmanOperationComponent implements OnInit, OnDestroy {
    /** 展示细节 */
    showDetail: boolean;
    /** tracking暂时列表 */
    trackingList: ITrackingListItem[];
    /** 提醒 */
    remind: IRemind;
    /** 预约日历 */
    calendarList: ICalendarItem[];

    constructor(
        private appService: AppService
    ) {
        this.showDetail = true;
        this.trackingList = [];
        this.remind = {...defaultRemidVal};
        this.calendarList = [];
    }

    ngOnInit() {
        this.loadTrackingList();
        this.loadRemindData();
        this.loadCalendarList();
    }

    /**
     * @func
     * @desc 加载预约跟踪数据
     */
    loadTrackingList() {
        this.trackingList = trackingListValue();
    }

    /**
     * @func
     * @desc 加载提醒数据
     */
    loadRemindData() {
        this.remind = remindValue();
    }

    /**
     * @func
     * @desc 加载预约日历
     */
    loadCalendarList() {
        this.calendarList = calendarValue();
    }

    ngOnDestroy() {}
}
