import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { ISourceCache, ICustomerItem } from './customer-detail.component.config';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
    /** 资源缓存 */
    sourceCache: ISourceCache | null;

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private localCache: LocalStorageService,
        private fb: FormBuilder
    ) {
        const cache = this.localCache.get(LocalStorageItemName.CUSTOMERDETAIL);
        this.sourceCache = cache && cache.value || null;
    }

    ngOnInit() {
        this.sourceCache && this.showDetailForm(this.sourceCache.currentCustomer);
    }

    /**
     * @callback
     * @desc 展示客户详情
     * @param customer 
     */
    showDetailForm(customer: ICustomerItem) {
        this.sourceCache.customerListCache.forEach((item: ICustomerItem) => {
            item['selected'] = customer.carId === item.carId;
        });
        this.loadDetailCustomerForm(customer);
    }

    /**
     * @func
     * @desc 加载客户详情
     * @param customer 
     */
    loadDetailCustomerForm(customer: ICustomerItem) {
        
    }

    ngOnDestroy() {}
}
