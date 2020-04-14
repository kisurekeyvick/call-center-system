import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPolicyReviewItem } from '../../policy-review-list/policy-review-list.component.config';

@Component({
    selector: 'confirm-outDoc-modal',
    templateUrl: './confirm-outDoc-modal.component.html',
    styleUrls: ['./confirm-outDoc-modal.component.scss']
})
export class ConfirmOutDocModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /** 保单审核 */
    @Input() policyItem: IPolicyReviewItem;

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder
    ) {

    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            /** 交强险金额 */
            clivtaPriceFinal: [null, [Validators.required]],
            /** 车船税 */
            travelTaxFinal: [null, [Validators.required]],
            /** 商业险金额 */
            viPriceFinal: [null, [Validators.required]],
            /** 出单日期 */
            payDate: [null, [Validators.required]]
        });
    }

    cancel() {
        this.modal.destroy('error');
    }

    submitForm(): void {
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.valid) {
            this.modal.destroy('success');
        }
    }

    ngOnDestroy() {}
}
