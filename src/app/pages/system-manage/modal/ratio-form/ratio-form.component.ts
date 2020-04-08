import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRatioSettingListItem, defaultRatioItem } from '../../ratio-setting/ratio-setting.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';

@Component({
    selector: '/ratio-form-modal',
    templateUrl: './ratio-form.component.html',
    styleUrls: ['./ratio-form.component.scss']
})
export class RatioFormModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /** 保险公司 */
    companyList = dictionary.get('insuranceCompanys');

    @Input() ratioItem: IRatioSettingListItem = {...defaultRatioItem};

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        const ratioItem = this.ratioItem;

        this.validateForm = this.fb.group({
            companyCode: [ratioItem.companyCode || '', [Validators.required]],
            discountUpperLimit: [ratioItem.discountUpperLimit || '', [Validators.required]]
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
