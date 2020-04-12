import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IRoleItem, ILoginUserCache, defaultLoginUserCache } from './login.component.config';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { LoginService } from './login.service';
import { of, fromEvent, Subscription } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'app-admin-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    /** 登入表单 */
    loginValidateForm: FormGroup;
    /** 注册表单 */
    registValidateForm: FormGroup;
    /** 当前处于选中的tanIndex */
    selectedIndex: number;
    /** 角色list */
    roleList: IRoleItem[] = [];
    /** 登录缓存 */
    loginUserCache: ILoginUserCache;
    /** 键盘enter事件 */
    documentKeydownEvent$: Subscription;

    constructor(
        private message: NzMessageService,
        private fb: FormBuilder,
        private localCache: LocalStorageService,
        private router: Router,
        private appService: AppService,
        private loginService: LoginService
    ) {
        this.selectedIndex = 0;
        this.loginUserCache = this.readUserLoginCache();
    }

    ngOnInit() {
        this.initLoginValidateForm();
        this.initRegistValidateForm();
        this.documentKeydownEvent$ = fromEvent(window, 'keyup').pipe(
            debounceTime(500)
        ).subscribe((res: KeyboardEvent) => {
            if (res.keyCode === 13) {
                this.loginSubmitForm();
            }
        });
    }

    /**
     * @func
     * @desc 初始化登录表单
     */
    initLoginValidateForm() {
        const { remember, username, password } = this.loginUserCache;

        this.loginValidateForm = this.fb.group({
            username: [remember && username || null, [Validators.required]],
            password: [remember && password || null, [Validators.required]],
            remember: [remember]
        });
    }

    /**
     * @func
     * @desc 初始化注册表单
     */
    initRegistValidateForm() {
        this.registValidateForm = this.fb.group({
            r_username: [null, [Validators.required]],
            r_password: [null, [Validators.required]],
            r_roleCode: [null, [Validators.required]]
        });
    }

    /**
     * @callback
     * @desc 点击登录
     */
    loginSubmitForm(): void {
        for (const i in this.loginValidateForm.controls) {
            this.loginValidateForm.controls[i].markAsDirty();
            this.loginValidateForm.controls[i].updateValueAndValidity();
        }

        if (this.loginValidateForm.valid) {
            // this.saveUserLoginCache();
            // /** 缓存token */
            // this.localCache.set('token', '$%^#%^%');
            // this.appService.loginSubject.next({
            //     needLogin: false,
            //     url: '/home'
            // });
            const { username, password } = this.loginValidateForm.value;
            const params = {
                username,
                password
            };
            
            this.loginService.userSignIn(params).pipe(
                catchError(err => of(err))
            ).subscribe(res => {
                this.saveUserLoginCache();
                /** 缓存token */
                this.localCache.set('token', res.Authorization);
                this.appService.loginSubject.next({
                    needLogin: false,
                    url: '/home'
                });
            });
        }
    }

    /**
     * @callback
     * @desc 点击注册
     */
    registSubmitForm() {
        for (const i in this.registValidateForm.controls) {
            this.registValidateForm.controls[i].markAsDirty();
            this.registValidateForm.controls[i].updateValueAndValidity();
        }
  
        if (this.registValidateForm.valid) {
            this.tabSelectChange({index: 0});
        }
    }

    /**
     * @func
     * @desc 读取用户登录信息缓存
     */
    readUserLoginCache(): ILoginUserCache {
        const value = this.localCache.get('loginUserInfo');
        
        if (value) {
            const userInfo: ILoginUserCache = value['value'];
            const { remember } = userInfo;

            if (remember) {
                return userInfo;
            }

            return defaultLoginUserCache;
        }

        return defaultLoginUserCache;
    }

    /**
     * @func
     * @desc 存储用户登录信息
     */
    saveUserLoginCache() {
        const formValue = this.loginValidateForm.value;
        this.localCache.set('loginUserInfo', formValue);
    }

    /**
     * @callback
     * @desc tab选中回调
     * @param e 
     */
    tabSelectChange({ index }: ICommon) {
        this.selectedIndex = index;

        if (index === 0) {
            this.initLoginValidateForm();
        } {
            this.initRegistValidateForm();
        }
    }

    ngOnDestroy() {
        this.documentKeydownEvent$.unsubscribe();
    }
}
