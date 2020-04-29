import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

@Injectable()
export class RebateApplicationService {
    constructor(
        private http: HttpClient) {
    }

    /**
     * @func
     * @desc 获取返利申请列表数据
     * @param params 
     */
    queryRebateList(params: ICommon): Observable<any> {
        return this.http.post(`api/order/rebateList`, params);
    }

    /**
     * @func
     * @desc 操作订单
     * @param params 
     */
    operationOrder(params: ICommon): Observable<any> {
        return this.http.post(`api/order/operationOrder`, params);
    }
}
