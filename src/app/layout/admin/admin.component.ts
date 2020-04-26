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
import { WordHelpComponent } from 'src/app/shared/component/word-help/word-help.component';
import { NzModalService } from 'ng-zorro-antd';

interface IUserProfileMenu {
    code?: string;
    name: string;
    icon: string;
    type?: string;
    index?: number;
    childrens: IUserProfileMenu[];
    [key: string]: any;
}

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AppAdminLayoutComponent implements OnInit, OnDestroy {
    public isCollapsed: boolean;
    public layoutMenus: IUserProfileMenu[] = [];
    public user: IUser;
    /** 是否展示业务员操作界面 */
    canShowSalesmanOperation: boolean;

    constructor(
        private localCache: LocalStorageService,
        private appService: AppService,
        private loginService: LoginService,
        private modalService: NzModalService
    ) {
        this.isCollapsed = false;
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

        this.readUserInfoCache();
    }

    /**
     * @callback
     * @desc 用户退出
     */
    userLogout() {
        this.loginService.userLogout({}).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (!(res instanceof TypeError)) {
                this.localCache.remove(LocalStorageItemName.TOKRN);
                this.appService.loginSubject.next({
                    needLogin: true,
                    url: '/login'
                });
            }
        });
    }

    /**
     * @func
     * @desc 读取用户缓存信息 进行是否展示业务操作界面 以及生成左侧快捷菜单
     */
    readUserInfoCache() {
        const cacheValue = this.localCache.get(LocalStorageItemName.USERPROFILE);
        const userInfo = cacheValue && cacheValue.value || null;

        this.showSalesmanOperation(userInfo);
        /** 这边暂时用mock数据 */
        this.layoutMenus = menus.get('admin');
        // this.layoutMenus = this.buildMenu(userInfo);
    }

    /**
     * @func
     * @desc 判断是否需要展示业务员操作界面
     * @param userInfo 
     */
    showSalesmanOperation(userInfo) {
        /** 如果存在用户信息 */
        if (userInfo) {
            const { roleCode } = userInfo;
            /** 如果roleCode匹配,则推送为true，展示便捷操作界面 */
            this.appService.SALESMAN_ROLE_CODE === roleCode && (this.canShowSalesmanOperation = true);
        }
    }

    /**
     * @func
     * @desc 加载菜单
     */
    buildMenu(userInfo):IUserProfileMenu[] {
        if (userInfo) {
            const menus: any[] = userInfo['menus'];
            return menus;
        }

        return [];
    }

    /**
     * @callback
     * @desc 点击话术帮助
     */
    wordHelp() {
        const modal = this.modalService.create({
            nzTitle: '话术帮助',
            nzContent: WordHelpComponent,
            nzComponentParams: {
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
            }
        });
    }

    ngOnDestroy() {}
}
