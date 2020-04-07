import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { IGiftItem, ISearchListItem, searchListItem, ISearchListModel, searchListModel,
    tableConifg, listValue } from './gift-manage.component.config';
// import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { GIftFormModalComponent } from './modal/gift-form/gift-form-modal.component';

type ITableCfg = typeof tableConifg;
type pageChangeType = 'pageIndex' | 'pageSize';

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
        private modalService: NzModalService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.giftList = [];
        // this.pageInfo = new PaginationService({
        //     total: 200,
        //     pageSize: 10,
        //     pageIndex: 1
        // });
        this.isLoading = true;
    }

    ngOnInit() {
        this.search();
    }

    /**
     * @callback
     * @desc 搜索
     */
    search() {
        this.loadGiftList({});
    }

    /**
     * @callback
     * @desc 重置搜索内容
     */
    reseat() {

    }

    /**
     * @func
     * @desc 加载赠品列表
     * @param params 
     * @param pageChangeType 
     */
    loadGiftList(params: ICommon, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        
        setTimeout(() => {
            this.giftList = listValue();
            this.isLoading = false;

            // if (pageChangeType === 'pageSize') {
            //     this.pageInfo.pageIndex = 1;
            // }
        }, 2000);
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
                formModel: gift
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `编辑成功`);
                this.search();
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
                formModel: {name: '', count: null}
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `添加成功`);
                this.search();
            }
        });
    }

    /**
     * @callback
     * @desc 删除礼品
     */
    deleteGift() {
        const deleteGiftArr:IGiftItem[]  = this.giftList.filter((item: IGiftItem) => this.mapOfCheckedId[item.id]);
        console.log('deleteGiftArr', deleteGiftArr);
        this.modalService.confirm({
            nzTitle: '警告',
            nzContent: '请再次确认是否删除',
            nzOkText: '删除',
            nzCancelText: '取消',
            nzOnOk: () => {
                this.message.create('success', `删除成功`);
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

    /**
     * @func
     * @desc 分页发生变化
     */
    // onPageChange(changeInfo: IPageChangeInfo) {
    //     const property = changeInfo.type;
    //     this.pageInfo[property] = changeInfo.value;

    //     this.loadGiftList({}, property);
    // }

    ngOnDestroy() {}
}
