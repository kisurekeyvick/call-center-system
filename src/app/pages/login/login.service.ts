import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface ICommon {
    [key: string]: any;
}

@Injectable()
export class LoginService {
    constructor(
        private http: HttpClient) {
    }

    /** 用户登录 */
    userSignIn(params: ICommon): Observable<any> {
        return this.http.post(`api/user/sign-in`, params);
    }

    /** 新建用户 */
    userSignUp(params: ICommon): Observable<any> {
        return this.http.post(`api/user/sign-up`, params);
    }

    /** 用户退出 */
    userLogout(params: ICommon): Observable<any> {
        return this.http.post(`api/user/logout`, params);
    }
}
