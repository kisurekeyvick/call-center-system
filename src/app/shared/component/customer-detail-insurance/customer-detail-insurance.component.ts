import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
    selector: 'customer-detail-insurance',
    templateUrl: './customer-detail-insurance.component.html',
    styleUrls: ['./customer-detail-insurance.component.scss']
})
export class CustomerDetailInsuranceComponent implements OnInit, OnDestroy {
    @Input() insList: any[] = [];

    constructor() {

    }

    ngOnInit() {

    }

    ngOnDestroy() {}
}
