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
            {
                name: '礼品设置', url: 'gift', icon: 'gift', children: []
            },
            { name: '个人设置', url: '/user', icon: 'user', children: [] },
            // { name: '今日汇总', url: '/home', icon: 'fund', children: [] },
            // { name: '名单申请', url: '/applyFor', icon: 'form', children: [] },
            // { name: '我的通话', url: '/phone', icon: 'phone', children: [] }
            // { name: '第一层级', url: '/first', icon: 'menu', children: [
            //     { name: '第二层级', url: '/first/second', icon: 'menu', children: [
            //         { name: '第三层级', url: '/first/second/third', icon: 'menu', children: [] }
            //     ] }
            // ] }
        ]
    ]
]);

export interface IMenu {
    name: string;
    url: string;
    icon: string;
    children: IMenu[];
}