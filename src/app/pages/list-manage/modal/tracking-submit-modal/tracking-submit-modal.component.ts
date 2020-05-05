import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListManageService } from '../../list-manage.service';

@Component({
    selector: 'tracking-submit-modal',
    templateUrl: './tracking-submit-modal.component.html',
    styleUrls: ['./tracking-submit-modal.component.scss']
})
export class TrackingSubmitModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /** 客户id */
    @Input() customerId: string;
    /** 预约级别 */
    appointmentLevelList: Array<{ name: string; value: string }>;
    /** 加载中 */
    isLoading = false;

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder,
        private customerService: ListManageService,
        private message: NzMessageService,
    ) {
        this.appointmentLevelList = [
            { name: 'A', value: 'A' },
            { name: 'B', value: 'B' },
            { name: 'C', value: 'C' },
            { name: 'D', value: 'D' },
            { name: 'E', value: 'E' },
        ];
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            appointmentLevel: [null, [Validators.required]],
            appointmentTime: [null, [Validators.required]]
        });
    }

    cancel() {
        this.modal.destroy('error');
    }

    /**
     * @callback
     * @desc 提交保存
     */
    submitForm() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.valid) {
            const params = {
                customerId: this.customerId,
                ...this.validateForm.value,
                operationCode: '2'
            };

            this.isLoading = true;
            this.customerService.operationCustomer(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    if (res.code !== '200') {
                        this.message.error(res.message);
                    } else {
                        this.modal.destroy('success');
                    }
                }

                this.isLoading = false;
            });
        }
    }

    ngOnDestroy() {}
}
