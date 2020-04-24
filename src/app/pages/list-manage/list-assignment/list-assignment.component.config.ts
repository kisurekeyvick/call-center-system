export const tableConifg = {
    thead: [
        { name: '业务员' },
        { name: '首播未处理' },
        { name: '首播已处理' },
        { name: '预约未处理' },
        { name: '预约已处理' },
        { name: '今日跟踪' },
        { name: '今日分配' },
        { name: '数量' }
    ]
};

export interface IAssignMember {
    id: number;
    name: string;
    untreatedTask: number;
    treatedTask: number;
    untreatedAppointment: number;
    treatedAppointment: number;
    followToday: number;
    distributedToday: number;
    amount: number;
    [key: string]: any;
}

export const listValue = (): IAssignMember[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            id: index + 1,
            name: `kisure ${index + 1}`,
            untreatedTask: 84,
            treatedTask: 0,
            untreatedAppointment: 71,
            treatedAppointment: 21,
            followToday: 1,
            distributedToday: 0,
            amount: 0
        };
    }); 
};