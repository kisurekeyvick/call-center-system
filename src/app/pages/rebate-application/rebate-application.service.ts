import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RebateApplicationService {
    constructor(
        private http: HttpClient) {
    }

    /** 这边写入一些ajax */
    // public queryRenewalTaskList(params: any): Observable<any> {
    //     return this.http.post(environment.gateway.SAAS + '/insurance/task/queryIRenewalTaskList', params);
    // }
}
