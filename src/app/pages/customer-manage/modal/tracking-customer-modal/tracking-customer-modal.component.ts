import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import {  IParams, defaultParams } from './tracking-customer-modal.component.config';
import { ICustomerItem } from '../../customer-list/customer-list.component.config';

@Component({
    selector: 'tracking-customer-modal',
    templateUrl: './tracking-customer-modal.component.html',
    styleUrls: ['./tracking-customer-modal.component.scss']
})
export class TrackingCustomerModalComponent implements OnInit, OnDestroy {
    /** 请求的参数 */
    params: IParams;
    /** 传递过来的客户列表数据 */
    @Input() customerList: ICustomerItem[] = [];

    constructor(
        private modal: NzModalRef
    ) {
        this.params = {...defaultParams};
    }

    ngOnInit() {}

    cancel() {
        this.modal.destroy('error');
    }

    sure() {
        this.modal.destroy('success');
    }

    ngOnDestroy() {}
} 
