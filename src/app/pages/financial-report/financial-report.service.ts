import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

export interface IQueryCustomerParams {
    query: {
        customerName: string;
        carNo: string;
        companyCode: string;
        userId: string;
        commitStartDate: number;
        commitEndDate: number;
        orderStartDate: number;
        orderEndDate: number;
    };
    reportParam: {
        compulsoryRatio: number;
        compulsoryAdditionRatio: number;
        commercialRatio: number;
        commercialAdditionRatio: number;
        drivingRatio: number;
        allowanceRatio: number;
        glassRatio: number;
        baseRatio: number;
        reward: number;
    };
    [key: string]: any;
}

@Injectable()
export class FinancialReportService {
    constructor(
        private http: HttpClient) {
    }

    /** 财务报表列表 */
    queryFinanceList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/finance/list`, params);
    }

    /** 导出财务报表 */
    exportFinanceReport(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/finance/export`, params);
    }

    /** 设置订单财务参数 */
    setOrderFinance(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/finance/order-finance`, params);
    }

    /** 险种查询 */
    financeQuery(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/finance/query`, params);
    }
}
