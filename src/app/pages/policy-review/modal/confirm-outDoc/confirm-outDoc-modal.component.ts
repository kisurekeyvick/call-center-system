import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPolicyReviewItem } from '../../policy-review-list/policy-review-list.component.config';
import { PolicyReviewService } from '../../policy-review.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
    /** 是否正在加载 */
    isLoading: boolean;

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder,
        private policyReviewService: PolicyReviewService,
        private message: NzMessageService,
    ) {

    }

    ngOnInit() {
        const { compulsorySumPremium, taxActual, commercialSumPremium, orderDate,
            drivingPremium, allowancePremium, glassPremium } = this.policyItem;

        this.validateForm = this.fb.group({
            /** 交强险金额 */
            compulsorySumPremium: [compulsorySumPremium, [Validators.required]],
            /** 车船税 */
            taxActual: [taxActual, [Validators.required]],
            /** 商业险金额 */
            commercialSumPremium: [commercialSumPremium, [Validators.required]],
            /** 出单日期 */
            orderDate: [orderDate, [Validators.required]],
            /** 驾意险价格 */
            drivingPremium: [drivingPremium, [Validators.required]],
            /** 津贴保价格 */
            allowancePremium: [allowancePremium, [Validators.required]],
            /** 玻璃膜价格 */
            glassPremium: [glassPremium, [Validators.required]]
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
            const params = {
                customerOrder: {
                    ...this.policyItem,
                    ...this.validateForm.value
                }
            };

            this.isLoading = true;
            this.policyReviewService.updateCustomerOrder(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    if (res === true) {
                        this.modal.destroy('success');
                    } else {
                        this.message.error('保存失败');
                    }
                }

                this.isLoading = false;
            });
        }
    }

    ngOnDestroy() {}
}
