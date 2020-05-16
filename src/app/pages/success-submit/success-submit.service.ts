import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

export interface IQueryCustomerParams {
    customerName: string;
    carNo: string;
    companyCode: string;
    userId: string;
    commitStartDate: number;
    commitEndDate: number;
    orderStartDate: number;
    orderEndDate: number;
    [key: string]: any;
}

@Injectable()
export class SuccessSubmitService {
    constructor(
        private http: HttpClient) {
    }

    /** 查询保单列表(订单列表) */
    queryOrderList(params: ICommon): Observable<any> {
        return this.http.post(`api/order/queryOrderList`, params);
    }

    /** 获取订单详情 */
    getCustomerOrderDetail(params: ICommon): Observable<any> {
        return this.http.post(`api/order/getCustomerOrderDetail`, params);
    }
}
