import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ITrackingListItem, IRemind, remindValue, 
    defaultRemidVal, ICalendarItem } from './salesman-operation.component.config';
import { Observable, interval, Subscription, fromEvent, of } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/api/api.service';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'salesman-operation',
    templateUrl: './salesman-operation.component.html',
    styleUrls: ['./salesman-operation.component.scss']
})
export class SalesmanOperationComponent implements OnInit, OnDestroy {
    /** 展示细节 */
    showDetail: boolean;
    /** tracking展示列表 */
    trackingList: ITrackingListItem[];
    /** 首播展示列表 */
    firstCallList: ITrackingListItem[];
    /** 提醒 */
    remind: IRemind;
    /** 预约日历 */
    calendarList: ICalendarItem[];
    /** 每隔一定时间调用接口 */
    intervalSource = interval(60000);
    /** 鼠标hover subscription */
    mouseHover$: Subscription;
    mouseClick$: Subscription;
    /** interval subscription */
    intervalSubscription$: Subscription;
    /** 当前处于选中的tanIndex */
    selectedIndex: number;

    constructor(
        private appService: AppService,
        private router: Router,
        private el: ElementRef,
        private apiService: ApiService,
        private localCache: LocalStorageService
    ) {
        this.showDetail = false;
        this.trackingList = [];
        this.firstCallList = [];
        this.remind = {...defaultRemidVal};
        this.calendarList = [];
        this.selectedIndex = 0;
        this.intervalSubscription$ = this.intervalSource.subscribe(() => {
            this.loadTrackingList();
            this.loadFirstCallList();
            // this.loadRemindData();
            this.loadCalendarList();
        });
    }

    ngOnInit() {
        this.loadTrackingList();
        this.loadFirstCallList();
        // this.loadRemindData();
        this.loadCalendarList();
        this.initToggleShowDetailEventListener();
    }

    /**
     * @func
     * @desc 初始化监听鼠标hover到class叫small-operation-show-icon的容器事件
     *      初始化监听dom点击事件隐藏详情
     */
    initToggleShowDetailEventListener() {
        const dom = this.el.nativeElement.querySelector('.small-operation-show-icon');
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
        this.apiService.appointmentTrack().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.trackingList = res;
            }
        });
    }

    /**
     * @func
     * @desc 加载首播
     */
    loadFirstCallList() {
        this.apiService.queryFirstCall().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.firstCallList = res;
            }
        });
    }

    /**
     * @func
     * @desc 加载提醒数据
     */
    // loadRemindData() {
    //     this.remind = remindValue();
    // }

    /**
     * @func
     * @desc 加载预约日历
     */
    loadCalendarList() {
        this.apiService.appointmentCalendar().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.calendarList = res;
            }
        });
    }

    /**
     * @callback
     * @desc tab选中回调
     * @param e 
     */
    tabSelectChange({ index }: ICommon) {
        this.selectedIndex = index;
    }

    /**
     * @callback
     * @desc 客户详情
     * @param trackItem 
     */
    customerDetail(item: ITrackingListItem, source: any[]) {
        const cache = {
            originPage: 'layout/operation',
            customerListCache: source,
            currentCustomer: item
        };

        this.localCache.set(LocalStorageItemName.CUSTOMERDETAIL, cache);
        this.router.navigate(['/customer/list', 'detail']);
    }

    ngOnDestroy() {
        this.mouseHover$.unsubscribe();
        this.mouseClick$.unsubscribe();
        this.intervalSubscription$.unsubscribe();
    }
}
