export const tableConfig = {
    thead: [
        { name: '姓名' },
        { name: '手机号' },
        { name: '配额数' }
    ]
};

export interface IEmplyeeItem {
    id: number;
    name: string;
    phone: string;
    departmentName: string;
    departmentCode: string;
    roleName: string;
    roleCode: string;
    [key: string]: any;
}

export const listValue = (): IEmplyeeItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            id: index + 1,
            name: '延保测试',
            username: 'yanbao',
            password: '$2a$10$UB/mlD/A/wrAVMtVeNZqVO8j/3LfWWE16hCXS/dTyUoq9jqREvqwC',
            phone: '18966665555',
            tenantCode: 'sbh',
            departmentCode: 'ybb',
            departmentName: '延保部',
            accountStatus: 'Using',
            roleCode: 'role_ybbmanager',
            roleName: '延保部管理员',
            creatorTime: '2019-09-17 16:18:29',
            deleteFlag: false,
            menus: null,
            permissions: [],
            departmentAdmin: true,
            admin: false
        };
    });
};
