import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

@Injectable()
export class DataReportService {
    constructor(
        private http: HttpClient) {
    }

    /** 战败原因列表 */
    queryFailReasonList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/customer/failReasonList`, params);
    }
}
