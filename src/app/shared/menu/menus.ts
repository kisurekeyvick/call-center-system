export const menus = new Map([
    [
        'admin', [
            { name: '组织结构', url: '/organization', icon: 'deployment-unit', children: [
                { name: '人员列表', url: '/organization/employees', icon: '', children: [] },
                { name: '角色权限', url: '/organization/role', icon: '', children: [] },
            ] },
            { name: '今日汇总', url: '/home', icon: 'fund', children: [] },
            { name: '名单申请', url: '/applyFor', icon: 'form', children: [] },
            { name: '个人信息', url: '/user', icon: 'user', children: [] },
            { name: '我的通话', url: '/phone', icon: 'phone', children: [] },
            { name: '第一层级', url: '/first', icon: 'menu', children: [
                { name: '第二层级', url: '/first/second', icon: 'menu', children: [
                    { name: '第三层级', url: '/first/second/third', icon: 'menu', children: [] }
                ] }
            ] }
        ]
    ]
]);

export interface IMenu {
    name: string;
    url: string;
    icon: string;
    children: IMenu[];
}