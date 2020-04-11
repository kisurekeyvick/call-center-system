import { Component, OnInit, OnDestroy } from '@angular/core';
import { menus, IMenu } from 'src/app/shared/menu/menus';
import { IUser } from './admin.config';
import { defaultUserPic } from 'src/assets/img.collection';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AppAdminLayoutComponent implements OnInit, OnDestroy {
    public isCollapsed: boolean;
    public layoutMenus: IMenu[] = [];
    public user: IUser;

    constructor(
        private localCache: LocalStorageService,
        private appService: AppService
    ) {
        this.isCollapsed = false;
        this.layoutMenus = menus.get('admin');
        this.user = {
            name: 'kisure',
            age: 27,
            pic: defaultUserPic,
        };
    }

    ngOnInit() {
    }

    /**
     * @callback
     * @desc 用户退出
     */
    userLogout() {
        this.localCache.remove('token');
        this.appService.loginSubject.next({
            needLogin: true,
            url: '/login'
        });
    }

    ngOnDestroy() {}
}


