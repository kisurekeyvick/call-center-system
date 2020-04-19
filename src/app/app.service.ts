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
    showSalesmanOperation: Subject<boolean> = new Subject<boolean>();
    /** 允许加载用户信息 */
    canLoadUserProfile: Subject<IUserProfileSubject> = new Subject<IUserProfileSubject>();

    constructor(
        private http: HttpClient) {
    }
}
