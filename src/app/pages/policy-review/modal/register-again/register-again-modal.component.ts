import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'register-again-modal',
    templateUrl: './register-again-modal.component.html',
    styleUrls: ['./register-again-modal.component.scss']
})
export class RegisterAgainModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /** 表单选项列表 */ 
    formList= {
        filialeList: []
    };
    /** 保单审核 */
    @Input() policyItem: any = {};

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder
    ) {

    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            /** 投保机构 */
            filialeCode: [null],
            /** 商业险金额 */
            viPriceFinal: [null],
            /** 交强险金额 */
            clivtaPriceFinal: [null],
            /** 车船税 */
            travelTaxFinal: [null],
            /** 驾意险价格 */
            drivingPremium: [null],
            /** 津贴保价格 */
            allowancePremium: [null],
            /** 玻璃膜价格 */
            glassPremium: [null]
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