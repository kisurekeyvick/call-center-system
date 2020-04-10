import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ISuccessSubmitListItem } from '../../success-submit.component.config';
import { ISalesman } from '../../success-submit.component.config';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'change-belong-modal',
    templateUrl: './change-belong-modal.component.html',
    styleUrls: ['./change-belong-modal.component.scss']
})
export class ChangeBelongModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;

    @Input() salesmenList: ISalesman[] = [];
    @Input() successSubmitItem: ISuccessSubmitListItem;

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder
    ) {

    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            salesman: [null, [Validators.required]]
        });
    }

    /**
     * @callback
     * @desc 取消
     */
    cancel() {
        this.modal.destroy('cancel');
    }

    /**
     * @callback
     * @desc 保存
     */
    submitForm() {
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
