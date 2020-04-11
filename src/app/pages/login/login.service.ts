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

    /** 这边写入一些ajax */
    // public queryRenewalTaskList(params: any): Observable<any> {
    //     return this.http.post(environment.gateway.SAAS + '/insurance/task/queryIRenewalTaskList', params);
    // }

    userSignIn(params: ICommon): Observable<any> {
        return this.http.post(`api/user/sign-in`, params);
    }
}
