export interface ISalesman {
    name: string;
    role: string;
    [key: string]: any;
}

export interface IAssignMember {
    userId: number;
    userName: string;
    firstCallNeedNum: number;
    firstCallAlreadyNum: number;
    appointmentNum: number;
    appointmentHandleNum: number;
    distributionNum: number;
    [key: string]: any;
}
