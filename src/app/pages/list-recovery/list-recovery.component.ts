import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ISalesman, salesmanlistValue } from './list-recovery.component.config';

@Component({
    selector: 'list-recovery-list',
    templateUrl: './list-recovery.component.html',
    styleUrls: ['./list-recovery.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class ListRecoveryComponent implements OnInit, OnDestroy {
    /** 业务员 */
    salesmanList: ISalesman[];
    /** 当前选中的业务员 */
    salesmen: string;
    /** 名单数量 */
    listCount: number;

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService
    ) {
        this.salesmanList = [];
        this.listCount = 0;
    }

    ngOnInit() {
        this.listRecoveryData();
        this.loadSalesMember();
    }

    /**
     * @func
     * @desc 加载名单回收数据
     */
    listRecoveryData() {

    }

    /**
     * @func
     * @desc 加载业务员
     */
    loadSalesMember() {
        this.salesmanList = salesmanlistValue();
    }

    /**
     * @callback
     * @desc 业务员发生更改
     */
    salesmamChange(value: string) {
        const target: ISalesman = this.salesmanList.find((salesman: ISalesman) => salesman.value === value);
        this.loadSalesmanRecoveryCount(value);
    }

    /**
     * @callback
     * @desc 加载回收名单数量
     * @param value 
     */
    loadSalesmanRecoveryCount(value: string) {
        this.listCount = Math.ceil(Math.random()*10000);
    }

    /**
     * @callback
     * @desc 编辑规则
     */
    editRule() {

    }

    ngOnDestroy() {}
}
