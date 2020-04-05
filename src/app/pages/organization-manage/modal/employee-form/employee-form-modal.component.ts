import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import { IformModel, defaultFormModel } from './employee-form-modal.component.config';
export * from './employee-form-modal.component.config';

@Component({
    selector: 'employee-form-modal',
    templateUrl: './employee-form-modal.component.html',
    styleUrls: ['./employee-form-modal.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
    /** 是否可以编辑 */
    disable = false;
    /** 账号状态列表 */
    accountStatusList = dictionary.get('accountStatus');
    /** 角色列表 */
    roleList = [];
    /** 部门列表 */
    departmentList = [];
    /** 密码是否可见 */
    passwordVisible = false;

    @Input() formModalType: 'add' | 'edit' | 'detail';
    @Input() formModel: IformModel;

    constructor(
        private modal: NzModalRef
    ) {
        this.formModalType === 'add' && ( this.formModel = {...defaultFormModel} );
    }

    ngOnInit() {}

    cancel() {
        this.modal.destroy('error');
    }

    sure() {
        this.modal.destroy('success');
    }

    ngOnDestroy() {}
}
