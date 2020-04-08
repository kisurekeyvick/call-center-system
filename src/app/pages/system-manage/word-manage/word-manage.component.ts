import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { wordItem, listValue } from './word-manage.component.config';
import { WordItemModalComponent } from '../modal/word-item-form/word-item-form.component';

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
    wordList: wordItem[];
    /** 是否正在加载 */
    isLoading: boolean;

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService
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

        setTimeout(() => {
            this.wordList = listValue();
            this.isLoading = false;
        }, 2000);
    }

    /**
     * @callback
     * @desc 添加话术
     */
    addWord() {
        const modal = this.modalService.create({
            nzTitle: '添加话术',
            nzContent: WordItemModalComponent,
            nzComponentParams: {},
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
    deleteWord(word: wordItem) {
        this.modalService.confirm({
            nzTitle: '提示',
            nzContent: `您确定删除话术"${word.name}"吗?`,
            nzOnOk: () => {
                this.message.success('删除成功');
                this.loadWordList();
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
    editWord(word: wordItem) {
        const modal = this.modalService.create({
            nzTitle: '修改话术',
            nzContent: WordItemModalComponent,
            nzComponentParams: {
                wordItem: word
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
