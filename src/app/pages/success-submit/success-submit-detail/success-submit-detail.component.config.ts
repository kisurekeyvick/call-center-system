import { dictionary } from 'src/app/shared/dictionary/dictionary';

export const usageList = dictionary.get('usage');
export const companyList = dictionary.get('insuranceCompanys');
export const insList = dictionary.get('planDetail');

export interface IGiftItem {
    id: number;
    tenantCode: string;
    giftName: string;
    giftPrice: string;
    name: string;
    value: string;
    [key: string]: any;
}
