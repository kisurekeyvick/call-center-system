export const tableConifg = {
    thead: [
        { name: '业务员' },
        { name: '首播未处理' },
        { name: '首播已处理' },
        { name: '预约未处理' },
        { name: '预约已处理' },
        { name: '今日分配' },
        { name: '数量' },
    ]
};

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
