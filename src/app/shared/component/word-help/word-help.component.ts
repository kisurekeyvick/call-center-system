import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IWordItem } from './word-help.component.config';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
    selector: 'word-help',
    templateUrl: './word-help.component.html',
    styleUrls: ['./word-help.component.scss']
})
export class WordHelpComponent implements OnInit, OnDestroy {
    /** 是否正在加载 */
    isLoading: boolean;
    /** 话术列表展示 */
    wordList: IWordItem[];
    /** 当前话术详情 */
    currentWordItemDetail: string;

    constructor(
        private apiService: ApiService,
        private modal: NzModalRef
    ) {
        this.wordList = [];
        this.currentWordItemDetail = '';
    }

    ngOnInit() {
        this.loadSpeechList();
    }

    /**
     * @func
     * @desc 加载话术
     */
    loadSpeechList() {
        this.isLoading = true;

        this.apiService.querySpeechList().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.wordList = res.map((item, index: number) => ({
                    ...item,
                    ...index === 0 && { selected: true }
                }));

                this.showWordItemDetail(res[0], 0);
            }

            this.isLoading = false;
        });
    }

    /**
     * @callback
     * @desc 点击展示话术详情
     * @param wordItem 
     */
    showWordItemDetail(wordItem: IWordItem, i: number) {
        console.log('hello kisure', wordItem, i);
        this.currentWordItemDetail = wordItem.details;
        this.wordList.forEach((item, index: number) => {
            item['selected'] = index === i;
        });
    }

    sure() {
        this.modal.destroy('cancel');
    }

    ngOnDestroy() {}
}
