export const menus = new Map([
    [
        'admin', [
            { name: '客户管理', url: '/customer', icon: 'team', childrens: [
                { name: '客户列表', url: '/customer/list', icon: '', childrens: [] },
                { name: '数据导入', url: '/customer/dataimport', icon: '', childrens: [] },
            ] },
            { name: '组织结构', url: '/organization', icon: 'deployment-unit', childrens: [
                { name: '人员列表', url: '/organization/employees', icon: '', childrens: [] },
                { name: '角色权限', url: '/organization/role', icon: '', childrens: [] },
            ] },
            { name: '个人设置', url: '/user', icon: 'user', childrens: [] },
            { name: '赠品管理', url: '/gift', icon: 'gift', childrens: [] },
            { name: '名单分配', url: '/listAssignment', icon: 'enter', childrens: [] },
            { name: '名单回收', url: '/listRecovery', icon: 'reload', childrens: [] },
            { name: '保单查询', url: '/successSubmit', icon: 'search', childrens: [] },
            { name: '名单查询', url: '/listQuery', icon: 'search', childrens: [] },
            { name: '返利申请', url: '/rebateApplication', icon: 'highlight', childrens: [] },
            { name: '今日汇总', url: '/summary', icon: 'carry-out', childrens: [] },
            { name: '保单审核', url: '/policyReview', icon: 'reconciliation', childrens: []},
            { name: '数据报表', url: '/dataReport', icon: 'bar-chart', childrens: [
                { name: '工作统计', url: '/dataReport/workStatistic', icon: '', childrens: [] },
                { name: '战败分析', url: '/dataReport/defeat', icon: '', childrens: [] },
                { name: '出单分析', url: '/dataReport/successSubmit', icon: '', childrens: [] },
                { name: '业绩分析', url: '/dataReport/kpi', icon: '', childrens: [] }
            ] },
            { name: '系统设置', url: '/system', icon: 'setting', childrens: [
                { name: '话术管理', url: '/system/wordManagement', icon: '', childrens: [] },
                { name: '返利比率', url: '/system/ratioSetting', icon: '', childrens: [] },
                { name: '战败原因设置', url: '/system/defeatReason', icon: '', childrens: [] },
            ] },
        ]
    ]
]);

export interface IMenu {
    name: string;
    url: string;
    icon: string;
    childrens: IMenu[];
    [key: string]: any;
}
