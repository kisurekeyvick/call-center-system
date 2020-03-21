export const menus = new Map([
    [
        'admin', [
            { name: '今日汇总', url: '', icon: '', children: [] },
            { name: '名单查询', url: '', icon: '', children: [] },
            { name: '名单申请', url: '', icon: '', children: [] },
            { name: '个人信息', url: '', icon: '', children: [] },
            { name: '我的通话', url: '', icon: '', children: [] },
            { name: '第一层级', url: '', icon: '', children: [
                { name: '第二层级', url: '', icon: '', children: [
                    { name: '第三层级', url: '', icon: '', children: [] }
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
