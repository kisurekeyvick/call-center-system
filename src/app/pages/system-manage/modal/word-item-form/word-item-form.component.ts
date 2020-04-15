import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IWordItem, defaultWordItem } from '../../word-manage/word-manage.component.config';
import { SystemManageService } from '../../system-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: '/word-item-form-modal',
    templateUrl: './word-item-form.component.html',
    styleUrls: ['./word-item-form.component.scss']
})
export class WordItemModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;

    @Input() wordItem: IWordItem = {...defaultWordItem};
    @Input() type: string = 'add';

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder,
        private systemManageService: SystemManageService
    ) {
    }

    ngOnInit() {
        const { brief, details } = this.wordItem;

        this.validateForm = this.fb.group({
            brief: [brief || '', [Validators.required]],
            details: [details || '', [Validators.required]]
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
            this.type === 'add' && this.addSpeech();
            this.type === 'update' && this.updateSpeech();
        }
    }

    /**
     * @func
     * @desc 添加话术
     */
    addSpeech() {
        const { isDelete } = this.wordItem;
        const params = {
            isDelete,
            ...this.validateForm.value
        };

        this.systemManageService.addSpeech(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.modal.destroy('success');
        });
    }

    /**
     * @func
     * @desc 更新话术
     */
    updateSpeech() {
        const { id, isDelete } = this.wordItem;
        const params = {
            id,
            isDelete,
            ...this.validateForm.value
        };

        this.systemManageService.updateSpeech(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.modal.destroy('success');
        });
    }

    ngOnDestroy() {}
}
