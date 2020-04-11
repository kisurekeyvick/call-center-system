import { Component, OnInit } from '@angular/core';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { Router } from '@angular/router';
import { AppService, ILoginSubject } from 'src/app/app.service';

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
        private appService: AppService
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
    }
}
