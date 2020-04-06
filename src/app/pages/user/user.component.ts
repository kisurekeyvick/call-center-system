import { Component, OnInit, OnDestroy } from '@angular/core';
import { zoomInAnimation } from 'src/app/shared/animate/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITab, tabs } from './user.component.config';
import { UploadChangeParam, UploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { defaultUserPic } from 'src/assets/img.collection';

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
        private message: NzMessageService
    ) {
        this.personalInfoValidateForm = this.fb.group({
            photo: [null],
            name: [null, [Validators.required]], 
        });

        this.modfiyPWDValidateForm = this.fb.group({
            oldPwd: [null, [Validators.required]],
            newPwd: [null, [Validators.required]],
            reNewPwd: [null, [Validators.required], [this.correctNewPwd]]
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
     * @callback
     * @desc 提交更改密码表单
     */
    submitModfiyPWDForm() {
        for (const i in this.modfiyPWDValidateForm.controls) {
            this.modfiyPWDValidateForm.controls[i].markAsDirty();
            this.modfiyPWDValidateForm.controls[i].updateValueAndValidity();
        }
    }

    /**
     * @func
     * @desc 再次确认的星密码是否一致
     * @param control 
     */
    correctNewPwd(control: FormControl): { [s: string]: boolean } {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.modfiyPWDValidateForm.controls.newPwd.value) {
            return { confirm: true, error: true };
        }

        return {};
    }

    /**
     * @callback
     * @desc 文件发生改变
     * @param param0 
     */
    handleChange({ file, fileList }: UploadChangeParam): void {
        const status = file.status;

        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            this.message.success(`${file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            this.message.error(`${file.name} file upload failed.`);
        }
    }

    /**
     * @func
     * @desc 自定义上传请求动作
     * https://ng.ant.design/components/upload/zh  上传查看自定义的demo
     */
    customReq = (item: UploadXHRArgs) => {
        const formData = new FormData();
        formData.append('file', item.file as any);
        formData.append('id', '1000');
        item.onSuccess({}, item.file, {});
    }

    ngOnDestroy() {}
}
