import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

export interface ICustomerExportParams {
    /** 初登日期开始时间 */
    startRegisterTime: string;
    /** 初始结束期 */
    endRegisterTime: string;
    /** 品牌 */
    brandName: string;
    /** 上年投保公司 */
    lastCompanyCode: string;
    /** 最低指导价 */
    minPurchasePrice: string;
    /** 最高指导价 */
    maxPurchasePrice: string;
    /** 车牌号 */
    carNo: string;
    /** 车辆所属 */
    ownerShip: string;
    /** 是否过户 */
    isTransfer: string;
    renewalState: string;
    /** 是否在职 */
    inJob: string;
    /** 是否是高端车 */
    isHigh: string;
    /** 店铺编号 */
    tenantCode: string;
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
export class CustomerService {
    constructor(
        private http: HttpClient) {
    }

    /** 客户导入 */
    customerImport(params: ICommon): Observable<any> {
        return this.http.post(`api/customer/import`, params);
    }

    /** 客户导出 */
    customerExport(params: ICommon): Observable<any> {
        return this.http.post(`api/customer/export`, params);
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

    /** 操作客户 */
    operationCustomer(params): Observable<any> {
        return this.http.post(`api/customer/operationCustomer`, params);
    }

    /** 战败原因列表查询 */
    queryDefeatReasonList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/defeatreason/queryAll`, params);
    }
}
