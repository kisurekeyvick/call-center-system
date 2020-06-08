export { IInsList, insList } from 'src/app/shared/component/customer-detail-insurance/customer-detail-insurance.component.config';

export interface ICustomerItem {
    carId: string;
    carNo: string;
    customerName: string;
    vinNo: string;
    brandName: string;
    enrollDate: string;
    commercialEndTime: string;
    compulsoryEndTime: string;
    lastCompanyCode: string;
    lastCompanyName: string;
    customerType: string;
    assigneeName: string;
    modifierTime: string;
    [key: string]: any;
}

export interface ISourceCache {
    originPage: string;
    currentCustomer: ICustomerItem;
    customerListCache: ICustomerItem[];
}

export interface IDefeatReasonItem {
    id?: number;
    defeatReason: string;
    isDelete?: string;
    [key: string]: any;
}

export interface IGiftItem {
    id: number;
    tenantCode: string;
    giftName: string;
    giftPrice: string;
    name: string;
    value: string;
    [key: string]: any;
}

export interface IQuoteInsurance {
    code: string;
    kindCode: string;
    name: string;
    coverage: string;
    quantity: string;
    rate: string;
    standardPremium: string;
    disCount: string;
    payPremium: string;
    netPremium: string;
}

export interface ICommercialInsurance {
    commercialStartTime: string;
    commercialEndTime: string;
    sumBenchPremium: string;
    disCount: string;
    sumPremium: string;
    insurances: IQuoteInsurance[];
}
