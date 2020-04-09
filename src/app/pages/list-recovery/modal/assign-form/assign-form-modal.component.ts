import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { tableConifg, ISalesman, salesmanlistValue } from './assign-form-modal.component.config';

type ITableCfg = typeof tableConifg;

@Component({
    selector: 'assign-form-modal',
    templateUrl: './assign-form-modal.component.html',
    styleUrls: ['./assign-form-modal.component.scss']
})
export class AssignFormModalComponent implements OnInit, OnDestroy {
    /** 业务员列表 */
    salesmanList: ISalesman[];
    /** 是否正在加载 */
    isLoading: boolean;
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;

    @Input() listCount: number = 0;

    constructor(
        private modal: NzModalRef
    ) {
        this.salesmanList = [];
    }

    ngOnInit() {
        this.loadSalesmanList();
    }

    /**
     * @func
     * @desc 加载业务员
     */
    loadSalesmanList() {
        this.isLoading = true;

        setTimeout(() => {
            this.salesmanList = salesmanlistValue();
            this.isLoading = false;
        }, 2000);
    }

    /**
     * @callback
     * @desc 取消
     */
    cancel() {
        this.modal.destroy('cancel');
    }

    /**
     * @callback
     * @desc 保存
     */
    save() {
        this.modal.destroy('success');
    }

    ngOnDestroy() {}
}
