import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, DoCheck, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import * as dayjs from 'dayjs';

@Component({
    selector: 'search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {
    /** 是否折叠 */
    isCollapse = true;
    search$: Subject<{ inputVal: string, index: number }> = new Subject();
    private _searchListModel: any;
    private _searchListItem: any;
    private _differ: KeyValueDiffer<any, any>;
    selectLoading: boolean;

    @Input()
    set searchListModel(value) {
        this._searchListModel = value;
        if (!this._differ && value) {
            this._differ = this.differs.find(value).create();
        }
    }

    get searchListModel() {
        return this._searchListModel;
    }

    @Input()
    set searchListItem(value) {
        this._searchListItem = value;
    }

    get searchListItem() {
        return this._searchListItem;
    }

    @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

    @Output() onReseat: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private differs: KeyValueDiffers
    ) {
        
    }

    ngOnInit() {
        /** select搜索功能 */
        this.search$.pipe(
            tap(() => { this.selectLoading = true; }),
            debounceTime(1000)
        ).subscribe(({ inputVal, index }) => {
            this.searchListItem[index].config.onSearch(inputVal).subscribe((res) => {
                this.selectLoading = false;
                this.searchListItem[index].config.options = res;
            });
        });
    }

    handleSelectSearch(inputVal: string, index: number) {
        if (this.searchListItem[index].config.onSearch instanceof Function && this.searchListItem[index].config.serverSearch) {
            this.search$.next({ inputVal, index });
        }
    }

    emitSearch() {
        const urlParams = Object.assign({}, this.searchListModel.attributes);
        Object.keys(urlParams).forEach((item) => {
            if (this.searchListModel.getInputTypes(item) === 'date' && urlParams[item]) {
                urlParams[item] = dayjs(urlParams[item]).format('YYYY-MM-DD HH:mm:ss');
            } else if (this.searchListModel.getInputTypes(item) === 'dateRange' && urlParams[item]) {
                urlParams[item] = urlParams[item].map(date => {
                    if (date) {
                        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
                    }
                });
            }
        });

        // this.router.navigate([this.router.url.split('?')[0]], {
        //     queryParams: urlParams
        // });

        this.onSearch.emit(urlParams);
    }

    /**
     * @callback
     * @desc 级联选择
     * @param selectVal 
     * @param index 
     */
    handleCascaderChanges(selectVal: string, index: number) {

    }

    emitReset() {
        this.onReseat.emit();
    }

    /**
     * @func
     * @desc 是否展示：展开收起功能
     */
    showAdvanceBtn() {
        return this.searchListItem.find((item: any) => {
            return item.isCollapse;
        });
    }

    toggleCollapse() {
        this.isCollapse = !this.isCollapse;
    }

    ngOnDestroy() {

    }
}
