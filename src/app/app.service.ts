import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

export interface ILoginSubject {
    needLogin: boolean;
    url: string;
}

export interface IUserProfileSubject {
    userID: number;
    canLoad: boolean;
}

@Injectable()
export class AppService {
    /** 用于判断是否能够登录和跳转 */
    loginSubject: Subject<ILoginSubject> = new Subject<ILoginSubject>();
    /** 展示业务员便捷操作界面 */
    showSalesmanOperation: Subject<{
        canShow: boolean;
        canListenClick: boolean;
    }> = new Subject<{
        canShow: boolean;
        canListenClick: boolean;
    }>();
    /** 允许加载用户信息 */
    canLoadUserProfile: Subject<IUserProfileSubject> = new Subject<IUserProfileSubject>();
    /** 业务员的roleCode */
    SALESMAN_ROLE_CODE: string = 'sale_man';

    constructor(
        private http: HttpClient) {
    }
}
