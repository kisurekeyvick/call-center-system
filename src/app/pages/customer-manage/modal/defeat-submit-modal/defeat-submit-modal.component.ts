import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { CustomerService } from '../../customer-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface IDefeatReasonItem {
    id?: number;
    defeatReason: string;
    isDelete?: string;
    [key: string]: any;
}

@Component({
    selector: 'defeat-submit-modal',
    templateUrl: './defeat-submit-modal.component.html',
    styleUrls: ['./defeat-submit-modal.component.scss']
})
export class DefeatSubmitModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /** 战败原因 */
    @Input() defeatReasonList: IDefeatReasonItem[] = [];
    /** 客户id */
    @Input() customerId: string;

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder,
        private customerService: CustomerService,
        private message: NzMessageService,
    ) {

    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            defeatReason: [null, [Validators.required]],
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
            const { defeatReason: defeatId } = this.validateForm.value;
            const defeat = this.defeatReasonList.find(reason => reason.id === defeatId);
            const params = {
                /** 4代表失败提交 */
                operationCode: '4',
                defeatId,
                defeatReason: defeat.defeatReason,
                customerId: this.customerId
            };
    
            this.customerService.operationCustomer(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                if (!(res instanceof TypeError)) {
                    const { result, message } = res;
                    if (result) {
                        this.modal.destroy('success');
                    } else {
                        this.message.create('error', message || '提交失败');
                    }
                }
            });
        }
    }

    ngOnDestroy() {}
}
