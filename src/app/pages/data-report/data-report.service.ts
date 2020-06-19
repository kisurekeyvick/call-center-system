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

    /** 客户分布详情 */
    queryCustomerStatistics(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/customer/customerStatistics`, params);
    }

    /** 战报 */
    queryBattle(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/report/battle`, params);
    }

    /** 业务员排名 */
    querySuccessRate(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/report/successRate`, params);
    }

    /** 战败原因列表查询 */
    queryTotalDefeatReasonList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/defeatreason/queryAll`, params);
    }
}
