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
};

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
    customerExport(params: ICustomerExportParams): Observable<any> {
        return this.http.post(`api/customer/export`, params);
    }
}
