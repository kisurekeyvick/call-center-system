import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDefeatReasonItem, defaultDefeatReason } from '../../defeat-reason/defeat-reason.component.config';

@Component({
    selector: '/defeat-reason-form-modal',
    templateUrl: './defeat-reason-form.component.html',
    styleUrls: ['./defeat-reason-form.component.scss']
})
export class DefeatReasonFormModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;

    @Input() defeatReason: IDefeatReasonItem = {...defaultDefeatReason};

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        const defeatReason = this.defeatReason;

        this.validateForm = this.fb.group({
            defeatReason: [defeatReason.defeatReason || '', [Validators.required]],
        });
    }

    cancel() {
        this.modal.destroy('cancel');
    }

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