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
    customerName: string;
    customerPhone: string;
    carNo: string;
    lastCompanyCode: string;
    companyCode: string;
    appointmentLevel: string;
    startRegisterTime: number;
    endRegisterTime: number;
    insuranceStartDate: number;
    insuranceEndDate: number;
    distributionStartDate: number;
    distributionEndDate: number;
    appointmentStartDate: number;
    appointmentEndDate: number;
    updateStartDate: number;
    updateEndDate: number;
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

    /** 查询客户详情 */
    queryCustomerDetail(params: ICommon): Observable<any> {
        return this.http.post(`api/customer/getCustomerDetail`, params);
    }
    
    /** 客户保存 */
    saveCustomer(params: ICommon): Observable<any> {
        return this.http.post(`api/customer/saveCustomer`, params);
    }

    /** 礼品列表查询 */
    queryGiftList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/gift/queryAll`, params);
    }

    /** 查询导入数据状态 */
    queryImportList(params: ICommon): Observable<any> {
        return this.http.get(`api/customer/import-list`, { params });
    }
}
