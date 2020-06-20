export interface ICustomerStatisticsItem {
    levelName: string;
    number: number;
}

export interface ISource {
    userId: number;
    userName: string;
    customerStatisticsList: ICustomerStatisticsItem[];
}

export interface ITableBodyItem {
    userInfo: Array<{
        userName: string;
        number: number;
    }>;
    [key: string]: any;
}

export interface ITable {
    head: Array<{  userName: string }>;
    body: ITableBodyItem[];
}
