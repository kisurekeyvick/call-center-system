import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRatioSettingListItem, defaultRatioItem } from '../../ratio-setting/ratio-setting.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import { SystemManageService } from '../../system-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
    @Input() type: string = 'add';

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder,
        private systemManageService: SystemManageService
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
            this.type === 'add' && this.addRebate();
            this.type === 'update' && this.updateRebate();
            this.modal.destroy('success');
        }
    }

    /**
     * @func
     * @desc 添加返利
     */
    addRebate() {
        const params = {
            ...this.validateForm.value
        };

        this.systemManageService.addRebate(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            res === true && this.modal.destroy('success');
        });
    }

    /**
     * @func
     * @desc 修改返利
     */
    updateRebate() {
        const { id } = this.ratioItem;
        const params = {
            id,
            ...this.validateForm.value
        };

        this.systemManageService.updateRebate(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            res === true && this.modal.destroy('success');
        });
    }

    ngOnDestroy() {}
}
