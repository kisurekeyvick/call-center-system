import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IPageInfo, IPageChangeInfo } from './pagination';

@Component({
    selector: 'search-list-pagination',
    templateUrl: './search-list-pagination.component.html',
    styleUrls: ['./search-list-pagination.component.scss']
})
export class SearchListPaginationComponent implements OnInit, OnDestroy {
    private _pageInfo: IPageInfo;

    constructor() {

    }

    @Input()
    set pageInfo(value) {
        this._pageInfo = value;
    }

    get pageInfo() {
        return this._pageInfo;
    }

    @Output() onPageChange: EventEmitter<IPageChangeInfo> = new EventEmitter<IPageChangeInfo>();

    /**
     * @callback
     * @desc 页码改变的回调
     */
    pageIndexChange(num: number) {
        this.onPageChange.emit({ type: 'pageIndex', value: num });
    }

    /**
     * @callback
     * @desc 每页条数改变的回调
     */
    pageSizeChange(num: number) {
        this.onPageChange.emit({ type: 'pageSize', value: num });
    }

    ngOnInit() {}

    ngOnDestroy() {}
}
