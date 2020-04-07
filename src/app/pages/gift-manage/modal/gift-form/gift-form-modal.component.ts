import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { defaultFormModal } from './gift-form-modal.component.config';
import { IGiftItem } from '../../gift-manage.component.config';

@Component({
    selector: 'gift-form-modal',
    templateUrl: './gift-form-modal.component.html',
    styleUrls: ['./gift-form-modal.component.scss']
})
export class GIftFormModalComponent implements OnInit, OnDestroy {
    /** 是否不可以编辑 */
    disable = false;
    /** 默认表单值 */
    private _formModel:IGiftItem = { ...defaultFormModal };

    @ViewChild('inputCountElement', { static: false }) inputCountElement: ElementRef;
    
    @Input() 
    set formModel(value) {
        this._formModel = value;
    }

    get formModel() {
        return this._formModel;
    }

    constructor(
        private modal: NzModalRef
    ) {

    }

    ngOnInit() {}

    /**
     * @callback
     * @desc count发生变化
     */
    onCountChange(value: string) {
        this.updateValue(value);
    }

    /**
     * @callback
     * @desc 失去焦点触发
     */
    onBlurCount() {
        if (this.formModel.count.charAt(this.formModel.count.length - 1) === '.' || this.formModel.count === '-') {
            this.updateValue(this.formModel.count.slice(0, -1));
        }
    }

    cancel() {
        this.modal.destroy('error');
    }

    sure() {
        this.modal.destroy('success');
    }

    updateValue(value: string): void {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
            this.formModel.count = value;
        }

        this.inputCountElement.nativeElement.value = this.formModel.count;
    }

    formatNumber(value: string): string {
        const string = `${value}`;
        const list = string.split('.');
        const prefix = list[0].charAt(0) === '-' ? '-' : '';
        let num = prefix ? list[0].slice(1) : list[0];
        let result = '';
        while (num.length > 3) {
          result = `,${num.slice(-3)}${result}`;
          num = num.slice(0, num.length - 3);
        }
        if (num) {
          result = num + result;
        }
        return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
    }

    ngOnDestroy() {}
}