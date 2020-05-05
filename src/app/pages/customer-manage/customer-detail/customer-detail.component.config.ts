import { ICustomerItem } from '../customer-list/customer-list.component.config';
export { ICustomerItem } from '../customer-list/customer-list.component.config';
export { IInsList, insList } from 'src/app/shared/component/customer-detail-insurance/customer-detail-insurance.component.config';

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
    [key: string]: any;
}
