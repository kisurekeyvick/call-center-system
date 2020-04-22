import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { IGiftItem, ISearchListItem, searchListItem, ISearchListModel, searchListModel,
    tableConifg, listValue } from './gift-manage.component.config';
import { GIftFormModalComponent } from './modal/gift-form/gift-form-modal.component';
import { GiftService } from './gift-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

type ITableCfg = typeof tableConifg;

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'gift-manage-list',
    templateUrl: './gift-manage.component.html',
    styleUrls: ['./gift-manage.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class GiftManageListComponent implements OnInit, OnDestroy {
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    /** gift展示数据 */
    giftList: IGiftItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;
    /** 分页 */
    // pageInfo: PaginationService;
    /** 是否正在加载 */
    isLoading: boolean;
    /** 是否可以删除 */
    canDeleteGift: boolean = false;
    /** 是否全部选中 */
    isAllDisplayDataChecked: boolean = false;
    isIndeterminate: boolean = false;
    /** 选中记录 */
    mapOfCheckedId: { [key: string]: boolean } = {};

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService,
        private giftService: GiftService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.giftList = [];
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadGiftList();
    }

    /**
     * @func
     * @desc 加载赠品列表
     * @param params 
     * @param pageChangeType 
     */
    loadGiftList() {
        this.isLoading = true;

        this.giftService.queryGiftList().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.giftList = res;
            }
            
            this.isLoading = false;
        });
    }

    /**
     * @callback
     * @desc 编辑礼品
     */
    editGift(gift: IGiftItem) {
        const modal = this.modalService.create({
            nzTitle: '编辑赠品',
            nzContent: GIftFormModalComponent,
            nzComponentParams: {
                formModel: gift,
                type: 'update'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `编辑成功`);
                this.loadGiftList();
            }
        });
    }

    /**
     * @callback
     * @desc 添加礼品
     */
    addGift() {
        const modal = this.modalService.create({
            nzTitle: '添加赠品',
            nzContent: GIftFormModalComponent,
            nzComponentParams: {
                type: 'add'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `添加成功`);
                this.loadGiftList();
            }
        });
    }

    /**
     * @callback
     * @desc 删除礼品
     */
    deleteGift() {
        const deleteGiftArr: IGiftItem[]  = this.giftList.filter((item: IGiftItem) => this.mapOfCheckedId[item.id]);
        const idArr = deleteGiftArr.map((item: IGiftItem) => item.id);
        const params = {
            idList: idArr
        };
        this.modalService.confirm({
            nzTitle: '警告',
            nzContent: '请再次确认是否删除',
            nzOkText: '删除',
            nzCancelText: '取消',
            nzOnOk: () => {
                this.giftService.deleteGift(params).pipe(
                    catchError(err => of(err))
                ).subscribe(res => {
                    if (res === true) {
                        this.message.create('success', `删除成功`);
                        this.loadGiftList();
                    } else {
                        this.message.create('error', `删除失败`);
                    }
                });
            }
        });
    }

    /**
     * @callback
     * @desc 选中全部礼品
     * @param value 
     */
    checkAllGift(value: boolean) {
        this.giftList.forEach(item => (this.mapOfCheckedId[item.id] = value));
        this.refreshStatus();
    }

    refreshStatus() {
        this.isAllDisplayDataChecked = this.giftList.every(item => this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.giftList.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
        this.computedCanDeleteGiftVal();
    }

    /**
     * @func
     * @desc 计算canDeleteGift的值
     */
    computedCanDeleteGiftVal() {
        this.canDeleteGift = this.giftList.some(item => this.mapOfCheckedId[item.id]);
    }

    ngOnDestroy() {}
}
