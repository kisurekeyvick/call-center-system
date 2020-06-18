export interface IFailReasonItem {
    failReason: string;
    number: number;
}

export interface ISource {
    userName: string;
    userId: number;
    failReasonList: IFailReasonItem[];
}