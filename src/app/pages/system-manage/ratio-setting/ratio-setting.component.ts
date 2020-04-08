import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tableConifg, IRatioSettingListItem, listValue } from './ratio-setting.component.config';
import { RatioFormModalComponent } from '../modal/ratio-form/ratio-form.component';

type ITableCfg = typeof tableConifg;

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'ratio-setting-list',
    templateUrl: './ratio-setting.component.html',
    styleUrls: ['./ratio-setting.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class RatioSettingListComponent implements OnInit, OnDestroy {
    /** 返点比例展示列表 */
    ratioSettingList: IRatioSettingListItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;
    /** 是否正在加载 */
    isLoading: boolean;

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService
    ) {
        this.ratioSettingList = [];
    }

    ngOnInit() {
        this.loadRatioSettingList();
    }

    /**
     * @func
     * @desc 加载返点比例数据
     */
    loadRatioSettingList() {
        this.isLoading = true;

        setTimeout(() => {
            this.ratioSettingList = listValue();
            this.isLoading = false;
        }, 2000);
    }

    /**
     * @callback
     * @desc 添加返点比例
     */
    addRatio() {
        const modal = this.modalService.create({
            nzTitle: '添加返点比率',
            nzContent: RatioFormModalComponent,
            nzComponentParams: {},
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `添加成功`);
                this.loadRatioSettingList();
            }
        });
    }

    /**
     * @callback
     * @desc 删除返点比例
     * @param ratio 
     */
    deleteRatio(ratio: IRatioSettingListItem) {
        this.modalService.confirm({
            nzTitle: '提示',
            nzContent: `您确定删除该条数据吗?`,
            nzOnOk: () => {
                this.message.success('删除成功');
                this.loadRatioSettingList();
            },
            nzOnCancel: () => {
                this.message.info('您已取消删除操作');
            }
        });
    }

    /**
     * @callback
     * @desc 修改返点比例
     * @param ratio 
     */
    modfiyRatio(ratio: IRatioSettingListItem) {
        const modal = this.modalService.create({
            nzTitle: '修改返点比率',
            nzContent: RatioFormModalComponent,
            nzComponentParams: {
                ratioItem: ratio
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `修改成功`);
                this.loadRatioSettingList();
            }
        });
    }

    ngOnDestroy() {}
}