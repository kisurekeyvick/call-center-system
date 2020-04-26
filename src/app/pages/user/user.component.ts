import { Component, OnInit, OnDestroy } from '@angular/core';
import { zoomInAnimation } from 'src/app/shared/animate/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITab, tabs } from './user.component.config';
import { NzMessageService } from 'ng-zorro-antd/message';
import { defaultUserPic } from 'src/assets/img.collection';
import { ApiService } from 'src/app/api/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'user-setting-container',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: [
        zoomInAnimation()
    ]
})
export class UserSettingComponent implements OnInit, OnDestroy {
    /** 个人信息表单 */
    personalInfoValidateForm: FormGroup;
    /** 密码更改表单 */
    modfiyPWDValidateForm: FormGroup;
    /**  */
    tabs: ITab[];
    /** --密码修改-- */
    /** 旧密码是否可看 */
    oldPasswordVisible = false;
    /** 新密码是否可看 */
    newPasswordVisible = false;
    /** 再次确认新密码是否可看 */
    reNewPasswordVisible = false;
    /** 默认头像 */
    defaultUserPic = defaultUserPic;

    constructor(
        private fb: FormBuilder,
        private message: NzMessageService,
        private apiService: ApiService,
        private router: Router,
        private localCache: LocalStorageService,
        private appService: AppService
    ) {
        this.personalInfoValidateForm = this.fb.group({
            photo: [null],
            name: [null, [Validators.required]], 
        });

        this.modfiyPWDValidateForm = this.fb.group({
            oldPwd: [null, [Validators.required]],
            newPwd: [null, [Validators.required]],
            confirmPwd: [null, [Validators.required, this.correctNewPwd]]
        });

        this.tabs = [...tabs];
    }

    ngOnInit() {

    }

    /**
     * @callback
     * @desc 提交个人信息表单
     */
    submitPersonalInfoForm() {
        for (const i in this.personalInfoValidateForm.controls) {
            this.personalInfoValidateForm.controls[i].markAsDirty();
            this.personalInfoValidateForm.controls[i].updateValueAndValidity();
        }
    }

    /**
     * @func
     * @desc 再次确认的星密码是否一致
     * @param control 
     */
    correctNewPwd = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.modfiyPWDValidateForm.controls.newPwd.value) {
            return { confirm: true, error: true };
        }

        return {};
    }

    /**
     * @callback
     * @desc 提交更改密码表单
     */
    submitModfiyPWDForm() {
        for (const i in this.modfiyPWDValidateForm.controls) {
            this.modfiyPWDValidateForm.controls[i].markAsDirty();
            this.modfiyPWDValidateForm.controls[i].updateValueAndValidity();
        }

        if (this.modfiyPWDValidateForm.valid) {
            const params = {
                ...this.modfiyPWDValidateForm.value
            };

            this.apiService.updatePWD(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                res === null && this.reLogin();
            });
        }
    }

    /**
     * @func
     * @desc 重新登录
     */
    reLogin() {
        this.localCache.clear();
        this.appService.loginSubject.next({
            needLogin: true,
            url: '/login'
        });
    }

    ngOnDestroy() {}
}
