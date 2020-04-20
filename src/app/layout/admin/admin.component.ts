import { Component, OnInit, OnDestroy } from '@angular/core';
import { menus, IMenu } from 'src/app/shared/menu/menus';
import { IUser } from './admin.config';
import { defaultUserPic } from 'src/assets/img.collection';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { AppService } from 'src/app/app.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { ILoginUserCache } from 'src/app/pages/login/login.component.config';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AppAdminLayoutComponent implements OnInit, OnDestroy {
    public isCollapsed: boolean;
    public layoutMenus: IMenu[] = [];
    public user: IUser;
    /** 是否展示业务员操作界面 */
    canShowSalesmanOperation: boolean;

    constructor(
        private localCache: LocalStorageService,
        private appService: AppService,
        private loginService: LoginService
    ) {
        this.isCollapsed = false;
        this.layoutMenus = menus.get('admin');
        this.user = {
            name: 'kisure',
            age: 27,
            pic: defaultUserPic,
        };
        this.canShowSalesmanOperation = false;
    }

    ngOnInit() {
        this.appService.showSalesmanOperation.subscribe((res: boolean) => {
            this.canShowSalesmanOperation = res;
        });

        this.showSalesmanOperation();
    }

    /**
     * @callback
     * @desc 用户退出
     */
    userLogout() {
        this.loginService.userLogout({}).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.localCache.remove('token');
            this.appService.loginSubject.next({
                needLogin: true,
                url: '/login'
            });
        });
    }

    /**
     * @func
     * @desc 判断是否需要展示业务员操作界面
     * @param userInfo 
     */
    showSalesmanOperation() {
        const cacheValue = this.localCache.get(LocalStorageItemName.USERPROFILE);
        const userInfo = cacheValue && cacheValue.value || null;

        /** 如果存在用户信息 */
        if (userInfo) {
            const { roleCode } = userInfo;
            /** 如果roleCode匹配,则推送为true，展示便捷操作界面 */
            this.appService.SALESMAN_ROLE_CODE === roleCode && (this.canShowSalesmanOperation = true);
        }
    }

    ngOnDestroy() {}
}


