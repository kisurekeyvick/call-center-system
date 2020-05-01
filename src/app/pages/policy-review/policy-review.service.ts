import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

export interface IQueryCustomerParams {
    /** 品牌 */
    brandName: string;
    /** 车牌号 */
    carNo: string;
    /** 是否在职 */
    inJob: boolean;
    /** 是否高端车 */
    isHigh: boolean;
    /** 是否过户 */
    isTransfer: boolean;
    /** 去年保险公司 */
    lastCompanyCode: string;
    /** 指导价 */
    maxPurchasePrice: number;
    minPurchasePrice: number;
    /** 车辆所属 */
    ownerShip: string;
    /** 是否是续保车 */
    renewalState: string;
    /** 初登日期 */
    startRegisterTime: number;
    endRegisterTime: number;
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
}
