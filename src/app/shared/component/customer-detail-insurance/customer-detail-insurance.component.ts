import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'customer-detail-insurance',
    templateUrl: './customer-detail-insurance.component.html',
    styleUrls: ['./customer-detail-insurance.component.scss']
})
export class CustomerDetailInsuranceComponent implements OnInit, OnDestroy {
    @Input() insList: any[] = [];
    @Input() showCheckbox: boolean = false;
    @Output() onPayPremiumChange: EventEmitter<any> = new EventEmitter<any>();

    constructor() {

    }

    ngOnInit() {

    }

    /**
     * @callback
     * @desc 保费发生变化
     */
    payPremiumChange() {
        this.onPayPremiumChange.emit();
    }

    ngOnDestroy() {}
}
