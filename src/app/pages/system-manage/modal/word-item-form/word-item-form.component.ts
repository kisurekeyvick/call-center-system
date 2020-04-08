import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { wordItem, defaultWordItem } from '../../word-manage/word-manage.component.config';

@Component({
    selector: '/word-item-form-modal',
    templateUrl: './word-item-form.component.html',
    styleUrls: ['./word-item-form.component.scss']
})
export class WordItemModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;

    @Input() wordItem: wordItem = {...defaultWordItem};

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        const wordItem = this.wordItem;

        this.validateForm = this.fb.group({
            name: [wordItem.name || '', [Validators.required]],
            content: [wordItem.content || '', [Validators.required]]
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
