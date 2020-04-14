import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ITrackingListItem, trackingListValue, IRemind, remindValue, 
    defaultRemidVal, ICalendarItem, calendarValue } from './salesman-operation.component.config';
import { Observable, interval, Subscription, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

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
    /** 每隔一定时间调用接口 */
    intervalSource = interval(60000);
    /** 鼠标hover subscription */
    mouseHover$: Subscription;
    mouseClick$: Subscription;

    constructor(
        private appService: AppService,
        private router: Router,
        private el:ElementRef
    ) {
        this.showDetail = false;
        this.trackingList = [];
        this.remind = {...defaultRemidVal};
        this.calendarList = [];
        this.intervalSource.subscribe(() => {
            this.loadTrackingList();
            this.loadRemindData();
            this.loadCalendarList();
        });
    }

    ngOnInit() {
        this.loadTrackingList();
        this.loadRemindData();
        this.loadCalendarList();
        this.initToggleShowDetailEventListener();
    }

    /**
     * @func
     * @desc 初始化监听鼠标hover到class叫small-operation-show的容器事件
     *      初始化监听dom点击事件隐藏详情
     */
    initToggleShowDetailEventListener() {
        const dom = this.el.nativeElement.querySelector('.small-operation-show');
        this.mouseHover$ = fromEvent(dom, 'click').subscribe(() => {
            this.showDetail = true;
        });

        
        this.mouseClick$ = fromEvent(window, 'click').pipe(
            debounceTime(100)
        ).subscribe((res: MouseEvent) => {
            const boundaryDomClassName = 'salesman-operation';
            const currentClickNode = res.target;
            const inScope = this.isDomInScope(currentClickNode as HTMLElement, boundaryDomClassName);
            !inScope && (this.showDetail = false);
        });
    }

    /**
     * @func
     * @desc 读取节点判断是否在边界范围内
     * @param node 
     */
    isDomInScope(node: HTMLElement, boundNodeName: string): boolean {
        const classList: string[] = Array.from(node.classList || []);
        const exit = classList.indexOf(boundNodeName);
        const parentNode = node.parentNode;

        /** 如果存在class */
        if (exit > -1) {
            return true;
        }

        /** 如果不存在父节点 */
        if (!parentNode) {
            return false;
        } {
            return this.isDomInScope(parentNode as HTMLElement, boundNodeName);
        }
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

    /**
     * @callback
     * @desc 客户详情
     * @param trackItem 
     */
    customerDetail(trackItem: ITrackingListItem) {

    }

    ngOnDestroy() {
        this.mouseHover$.unsubscribe();
        this.mouseClick$.unsubscribe();
    }
}
