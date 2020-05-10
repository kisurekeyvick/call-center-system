import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PolicyReviewService } from '../../policy-review.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'register-again-modal',
    templateUrl: './register-again-modal.component.html',
    styleUrls: ['./register-again-modal.component.scss']
})
export class RegisterAgainModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /** 保单审核 */
    @Input() policyItem: ICommon = {};
    /** operationCode */
    @Input() operationCode = '';
    /** 操作类型 */
    @Input() type: string;

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder,
        private policyReviewService: PolicyReviewService,
        private message: NzMessageService,
    ) {
    }

    ngOnInit() {
        const { customerOrder = {} } = this.policyItem;
        const { commercialSumPremium, compulsorySumPremium, taxActual, drivingPremium, allowancePremium,
            glassPremium } = customerOrder;

        this.validateForm = this.fb.group({
            /** 商业险金额 */
            commercialSumPremium: [commercialSumPremium],
            /** 交强险金额 */
            compulsorySumPremium: [compulsorySumPremium],
            /** 车船税 */
            taxActual: [taxActual],
            /** 驾意险价格 */
            drivingPremium: [drivingPremium],
            /** 津贴保价格 */
            allowancePremium: [allowancePremium],
            /** 玻璃膜价格 */
            glassPremium: [glassPremium]
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
            this.type === 'approved' && this.operationOrderSave();
            this.type === 'registerAgain' && this.registerAgainSave();
        }
    }

    /**
     * @func
     * @desc 内勤通过保存
     */
    operationOrderSave() {
        const { customerOrder, quoteCommercialInsuranceDetailList, quoteInsurance } = this.policyItem;
        const params = {
            operationCode: this.operationCode,
            customerOrder: {
                ...customerOrder,
                ...this.validateForm.value
            }
        };

        this.policyReviewService.operationOrder(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                if (res.code === '200') {
                    this.modal.destroy('success');
                } else {
                    this.message.error(res.message);
                }
            }
        });
    }

    /**
     * @func
     * @desc 重新登记保存
     */
    registerAgainSave() {
        const { customerOrder, quoteCommercialInsuranceDetailList, quoteInsurance } = this.policyItem;
        const params = {
            customerOrder: {
                ...customerOrder,
                ...this.validateForm.value
            },
            quoteCommercialInsuranceDetailList,
            quoteInsurance
        };

        this.policyReviewService.updateCustomerOrder(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.modal.destroy('success');
            }
        });
    }

    ngOnDestroy() {}
}
