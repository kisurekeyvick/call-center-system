import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import { IformModel, defaultFormModel } from './employee-form-modal.component.config';
export * from './employee-form-modal.component.config';
import { OrganizationService } from '../../organization-manage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IRoleItem } from 'src/app/core/common/common.interface';

@Component({
    selector: 'employee-form-modal',
    templateUrl: './employee-form-modal.component.html',
    styleUrls: ['./employee-form-modal.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
    /** 表单 */
    validateForm: FormGroup;
    /** 账号状态列表 */
    accountStatusList = dictionary.get('accountStatus');
    /** 部门列表 */
    departmentList = [];
    /** 密码是否可见 */
    passwordVisible = false;

    @Input() formModalType: 'add' | 'edit' | 'detail';
    @Input() formModel: IformModel = {...defaultFormModel};
     /** 角色列表 */
    @Input() roleList: IRoleItem[] = [];

    constructor(
        private modal: NzModalRef,
        private organizationService: OrganizationService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        const formModel = this.formModel;
        const { name, accountStatus, phone, username, password, departmentCode, roleCode } = formModel;

        this.validateForm = this.fb.group({
            /** 姓名 */
            name: [name, [Validators.required]],
            /** 账号状态 */
            accountStatus: [accountStatus, [Validators.required]],
            /** 手机号 */
            phone: [phone, [Validators.required, this.validatePhone]],
            /** 用户名 */
            username: [username, [Validators.required]],
            /** 密码 */
            password: [password, [Validators.required]],
            /** 所属部门 */
            departmentCode: [departmentCode],
            /** 角色 */
            roleCode: [roleCode, [Validators.required]],
        });
    }

    /**
     * @func
     * @desc 验证手机号是否符合要求
     */
    validatePhone = (control: FormControl): { [s: string]: boolean } =>   {
        const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;

        if (!control.value) {
            return { nullvalue: true, error: true };
        } else if (!reg.test(control.value)) {
            return { confirm: true, error: true };
        }

        return {};
    }

    cancel() {
        this.modal.destroy('error');
    }

    /**
     * @callback
     * @desc 表单提交
     */
    submitForm() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.valid) {
            this.formModalType === 'add' && this.createUser();
            this.formModalType === 'edit' && this.updateUser();
        }
    }

    /**
     * @func
     * @desc 创建用户
     */
    createUser() {
        const params = {
            ...this.validateForm.value
        };

        this.organizationService.createUser(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.modal.destroy('success');
        });
    }

    /**
     * @func
     * @desc 更新用户
     */
    updateUser() {
        const { id } = this.formModel;
        const params = {
            ...this.validateForm.value,
            id
        };

        this.organizationService.updateUserInfo(params).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.modal.destroy('success');
        });
    }

    ngOnDestroy() {}
}
