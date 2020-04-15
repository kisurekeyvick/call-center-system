import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDefeatReasonItem, defaultDefeatReason } from '../../defeat-reason/defeat-reason.component.config';
import { SystemManageService } from '../../system-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: '/defeat-reason-form-modal',
    templateUrl: './defeat-reason-form.component.html',
    styleUrls: ['./defeat-reason-form.component.scss']
})
export class DefeatReasonFormModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;

    @Input() defeatReason: IDefeatReasonItem = {...defaultDefeatReason};
    @Input() type: string = 'add';

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder,
        private systemManageService: SystemManageService
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
            this.type === 'add' && this.addDefeatReason();
            this.type === 'update' && this.updateDefeatReason();
        }
    }

    /**
     * @func
     * @desc 添加战败原因
     */
    addDefeatReason() {
        const { isDelete } = this.defeatReason;
        const params = {
            isDelete,
            ...this.validateForm.value
        };

        this.systemManageService.addDefeatreason(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.modal.destroy('success');
        });
    }

    /**
     * @func
     * @desc 更新战败原因
     */
    updateDefeatReason() {
        const { id } = this.defeatReason;
        const params = {
            id,
            ...this.validateForm.value
        };

        this.systemManageService.updateDefeatreason(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.modal.destroy('success');
        });
    }

    ngOnDestroy() {}
}
