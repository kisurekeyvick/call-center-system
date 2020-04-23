import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

@Injectable()
export class ListManageService {
    constructor(
        private http: HttpClient) {
    }

    /** 客户导入 */
    // customerImport(params: ICommon): Observable<any> {
    //     return this.http.post(`api/customer/import`, params);
    // }
}