import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { defaultFormModal } from './gift-form-modal.component.config';
import { IGiftItem } from '../../gift-manage/gift-manage.component.config';
import { SystemManageService } from '../../system-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'gift-form-modal',
    templateUrl: './gift-form-modal.component.html',
    styleUrls: ['./gift-form-modal.component.scss']
})
export class GIftFormModalComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /** 是否不可以编辑 */
    disable = false;

    // @ViewChild('inputCountElement', { static: false }) inputCountElement: ElementRef;
    
    @Input() formModel: IGiftItem = {...defaultFormModal};
    @Input() type = 'add';

    constructor(
        private modal: NzModalRef,
        private fb: FormBuilder,
        private giftService: SystemManageService
    ) {

    }

    ngOnInit() {
        const { giftName, giftPrice } = this.formModel;

        this.validateForm = this.fb.group({
            giftName: [giftName, [Validators.required]],
            giftPrice: [giftPrice, [Validators.required]],
        });
    }

    cancel() {
        this.modal.destroy('error');
    }

    submitForm() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
  
        if (this.validateForm.valid) {
            this.type === 'add' && this.addGift();
            this.type === 'update' && this.updateGift();
        }
    }

    /**
     * @func
     * @desc 添加礼品
     */
    addGift() {
        const { tenantCode } = this.formModel;
        const params = {
            ...this.validateForm.value,
            tenantCode,
            isDelete: '2'
        };

        this.giftService.addGift(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            res === true && this.modal.destroy('success');
        });
    }

    /**
     * @func
     * @desc 修改礼品
     */
    updateGift() {
        const { id, tenantCode } = this.formModel;
        const params = {
            ...this.validateForm.value,
            id,
            tenantCode
        };

        this.giftService.updateGift(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            res === true && this.modal.destroy('success');
        });
    }

    ngOnDestroy() {}
}
