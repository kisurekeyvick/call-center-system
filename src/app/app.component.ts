import { Component, OnInit } from '@angular/core';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { Router } from '@angular/router';
import { AppService, ILoginSubject, IUserProfileSubject } from 'src/app/app.service';
import { ApiService } from 'src/app/api/api.service';
// import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    needLogin: boolean;

    constructor(
        private localCache: LocalStorageService,
        private router: Router,
        private appService: AppService,
        private apiService: ApiService
    ) {
        const token = this.localCache.get('token');
        this.needLogin = !token ? true : false;

        if (this.needLogin) {
            this.router.navigate(['/login']);
        }

        /** 如果处于login页面，但是不需要登录，则直接跳转到首页 */
        if (location.pathname === '/login' && !this.needLogin) {
            this.router.navigate(['/home']);
        }
    }

    ngOnInit() {
        this.appService.loginSubject.subscribe((res: ILoginSubject) => {
            const { needLogin, url } = res;
            this.needLogin = needLogin;
            this.router.navigate([url]);
        });

        /** 订阅是否加载用户信息 */
        // this.appService.canLoadUserProfile.subscribe((res: IUserProfileSubject) => {
        //     const { userID, canLoad } = res;
        //     canLoad && this.loadUserProfile(userID);
        // });

        // this.canShowSalesmanOperation();
    }

    /**
     * @func
     * @desc 加载用户基础信息
     */
    // loadUserProfile(userID: number) {
    //     const params = {
    //         id: userID
    //     };

    //     this.apiService.getUserProfile(params).subscribe(res => {
    //         const userInfo = res;
    //         this.localCache.set(LocalStorageItemName.USERPROFILE, userInfo);
    //         this.canShowSalesmanOperation(userInfo);
    //     });
    // }

    /**
     * @func
     * @desc 判断是否需要展示业务员操作界面
     * @param userInfo 
     */
    // canShowSalesmanOperation(userInfo?) {
    //     if (userInfo) {
    //         const { roleCode } = userInfo;
    //         this.appService.SALESMAN_ROLE_CODE === roleCode && this.appService.showSalesmanOperation.next(true);
    //     } {
    //         const cacheValue = this.localCache.get(LocalStorageItemName.USERPROFILE);
    //         const userInfo = cacheValue && cacheValue.value || null;

    //         /** 如果存在用户信息 */
    //         if (userInfo) {
    //             const { roleCode } = userInfo;
    //             /** 如果roleCode匹配,则推送为true，展示便捷操作界面 */
    //             this.appService.SALESMAN_ROLE_CODE === roleCode && this.appService.showSalesmanOperation.next(true);
    //         }
    //     }
    // }
}
