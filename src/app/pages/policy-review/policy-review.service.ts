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
export class PolicyReviewService {
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

    /** 更新订单详情 */
    updateCustomerOrder(params: ICommon): Observable<any> {
        return this.http.post(`api/order/updateCustomerOrder`, params);
    }

    /** 操作订单 */
    operationOrder(params: ICommon): Observable<any> {
        return this.http.post(`api/order/operationOrder`, params);
    }

    /** 礼品列表查询 */
    queryGiftList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/gift/queryAll`, params);
    }

    /** 更新打印 更新付款 */
    updateBatchCustomerOrder(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/order/updateBatchCustomerOrder`, params);
    }
}
