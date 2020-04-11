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

    userSignIn(params: ICommon): Observable<any> {
        return this.http.post(`api/user/sign-in`, params);
    }
}
