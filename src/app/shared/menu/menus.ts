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
            { name: '名单分配', url: '/listAssignment', icon: 'enter', children: [] },
            { name: '名回收', url: '/listRecovery', icon: 'reload', children: [] },
            { name: '保单查询', url: '/successSubmit', icon: 'search', children: [] },
            { name: '名单查询', url: '/listQuery', icon: 'search', children: [] },
            { name: '返利申请', url: '/rebateApplication', icon: 'highlight', children: [] },
            { name: '今日汇总', url: '/summary', icon: 'carry-out', children: [] },
            { name: '数据报表', url: '/dataReport', icon: 'bar-chart', children: [
                { name: '工作统计', url: '/dataReport/workStatistic', icon: '', children: [] },
                { name: '战败分析', url: '/dataReport/defeat', icon: '', children: [] },
                { name: '出单分析', url: '/dataReport/successSubmit', icon: '', children: [] },
                { name: '业绩分析', url: '/dataReport/kpi', icon: '', children: [] }
            ] },
            { name: '系统设置', url: '/system', icon: 'setting', children: [
                { name: '话术管理', url: '/system/wordManagement', icon: '', children: [] },
                { name: '返利比率', url: '/system/ratioSetting', icon: '', children: [] },
                { name: '战败原因设置', url: '/system/defeatReason', icon: '', children: [] },
            ] },
        ]
    ]
]);

export interface IMenu {
    name: string;
    url: string;
    icon: string;
    children: IMenu[];
}
