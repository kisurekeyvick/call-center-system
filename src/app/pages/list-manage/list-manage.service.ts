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
export class ListManageService {
    constructor(
        private http: HttpClient) {
    }

    /** 查询符合条件的总数量 */
    queryTotalNumber(params: IQueryCustomerParams): Observable<any> {
        return this.http.post(`api/customer/queryTotalNumber`, params);
    }

    /** 分配客户 */
    distributionCustomer(params): Observable<any> {
        return this.http.post(`api/customer/distributionCustomer`, params);
    }

    /** 查询客户列表 */
    queryCustomer(params): Observable<any> {
        return this.http.post(`api/customer/customerList`, params);
    }

    /** 查询今日业务员分配信息 */
    querySalesmenDistributionInfo(params = {}): Observable<any> {
        return this.http.post(`api/customer/queryDistributionInfo`, params);
    }
}
