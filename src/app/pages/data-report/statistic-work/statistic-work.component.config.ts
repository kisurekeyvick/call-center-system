export interface ICustomerStatisticsItem {
    levelName: string;
    number: number;
}

export interface ISource {
    userId: number;
    userName: string;
    customerStatisticsList: ICustomerStatisticsItem[];
}
