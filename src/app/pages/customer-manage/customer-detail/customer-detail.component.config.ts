import { ICustomerItem } from '../customer-list/customer-list.component.config';

export { ICustomerItem } from '../customer-list/customer-list.component.config';

export interface ISourceCache {
    originPage: string;
    currentCustomer: ICustomerItem;
    customerListCache: ICustomerItem[];
}
