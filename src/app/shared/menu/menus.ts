export const menus = new Map([
    [
        'admin', [
            { name: '客户管理', url: '/customer', icon: 'team', children: [
                { name: '客户列表', url: '/customer/list', icon: '', children: [] },
                { name: '数据导入', url: '/customer/dataimport', icon: '', children: [] },
            ] },
            { name: '组织结构', url: '/organization', icon: 'deployment-unit', children: [
                { name: '人员列表', url: '/organization/employees', icon: '', children: [] },
                { name: '角色权限', url: '/organization/role', icon: '', children: [] },
            ] },
            { name: '个人设置', url: '/user', icon: 'user', children: [] },
            { name: '赠品管理', url: '/gift', icon: 'gift', children: [] },
            { name: '名单分配', url: '/listAssignment', icon: 'enter', children: [] }
        ]
    ]
]);

export interface IMenu {
    name: string;
    url: string;
    icon: string;
    children: IMenu[];
}
