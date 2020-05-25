import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { IWordItem } from './word-manage.component.config';
import { WordItemModalComponent } from '../modal/word-item-form/word-item-form.component';
import { SystemManageService } from '../system-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'word-manage-list',
    templateUrl: './word-manage.component.html',
    styleUrls: ['./word-manage.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class WordManageComponent implements OnInit, OnDestroy {
    /** 话术列表展示 */
    wordList: IWordItem[];
    /** 是否正在加载 */
    isLoading: boolean;

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService,
        private systemManageService: SystemManageService
    ) {
        this.wordList = [];
    }

    ngOnInit() {
        this.loadWordList();
    }

    /**
     * @func
     * @desc 加载话术数据
     */
    loadWordList() {
        this.isLoading = true;

        this.systemManageService.querySpeechList().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.wordList = res.map(item => ({
                    ...item,
                    contentDesc: item.details ? item.details.slice(0, 20) + '...' : ''
                }));
            }

            this.isLoading = false;
        });
    }

    /**
     * @callback
     * @desc 添加话术
     */
    addWord() {
        const modal = this.modalService.create({
            nzTitle: '添加话术',
            nzContent: WordItemModalComponent,
            nzComponentParams: {
                type: 'add'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `添加成功`);
                this.loadWordList();
            }
        });
    }

    /**
     * @callback
     * @desc 删除话术
     * @param index 
     */
    deleteWord(word: IWordItem) {
        this.modalService.confirm({
            nzTitle: '提示',
            nzContent: `您确定删除话术"${word.brief}"吗?`,
            nzOnOk: () => {
                const params = {
                    idList: [word.id]
                };
                
                this.systemManageService.deleteSpeech(params).pipe(
                    catchError(err => of(err))
                ).subscribe(res => {
                    this.message.success('删除成功');
                    this.loadWordList();
                });
            },
            nzOnCancel: () => {
                this.message.info('您已取消删除操作');
            }
        });
    }

    /**
     * @callback
     * @desc 编辑话术
     * @param word 
     */
    editWord(word: IWordItem) {
        const modal = this.modalService.create({
            nzTitle: '修改话术',
            nzContent: WordItemModalComponent,
            nzComponentParams: {
                wordItem: word,
                type: 'update'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `修改成功`);
                this.loadWordList();
            }
        });
    }

    ngOnDestroy() {}
}
