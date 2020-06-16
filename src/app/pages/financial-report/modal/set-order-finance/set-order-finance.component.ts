import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IQueryListItem } from '../../financial-report.component.config';
import { FinancialReportService } from '../../financial-report.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'set-order-finance',
    templateUrl: './set-order-finance.component.html',
    styleUrls: ['./set-order-finance.component.scss']
})
export class SetOrderFinanceFormModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /**  */
    @Input() orderItem: IQueryListItem;

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder,
        private financialReportService: FinancialReportService
    ) {

    }

    ngOnInit() {
        const { orderId } = this.orderItem;
        this.validateForm = this.fb.group({
            orderId: [orderId, null],
            customerId: [null],
            compulsoryRatio: [4],
            compulsoryAdditionRatio: [26],
            commercialRatio: [20],
            commercialAdditionRatio: [10],
            drivingRatio: [30],
            allowanceRatio: [30],
            glassRatio: [30],
            baseRatio: [106],
            reward: [1]
        });
    }

    /**
     * @func
     * @desc 整理请求参数
     */
    formatParams() {
        const { orderId, customerId, compulsoryRatio, compulsoryAdditionRatio,commercialRatio, commercialAdditionRatio,
            drivingRatio, allowanceRatio, glassRatio, baseRatio, reward } = this.validateForm.value;
        
        const params = {
            orderId, customerId, 
            compulsoryRatio: compulsoryRatio / 100, 
            compulsoryAdditionRatio: compulsoryAdditionRatio / 100, 
            commercialRatio: commercialRatio / 100, 
            commercialAdditionRatio: commercialAdditionRatio / 100,
            drivingRatio: drivingRatio / 100, 
            allowanceRatio: allowanceRatio / 100, 
            glassRatio: glassRatio / 100, 
            baseRatio: baseRatio / 100, 
            reward
        };

        return params;
    }

    submitForm(): void {
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.valid) {
            const params = this.formatParams();

            this.financialReportService.setOrderFinance(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    this.modal.destroy('success');
                }
            });
        }
    }

    cancel() {
        this.modal.destroy('cancel');
    }

    ngOnDestroy() {}
}
