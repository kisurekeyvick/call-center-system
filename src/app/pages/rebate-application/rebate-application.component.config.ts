import { dictionary } from 'src/app/shared/dictionary/dictionary';

const rebateApplicationStatusList = dictionary.get('rebateApplicationStatusList');
const insuranceCompanysList = dictionary.get('insuranceCompanys');

export interface ISearchListItem {
    id: number;
    label?: string;
    placeholder?: string;
    type: string;
    config?: any;
    [key: string]: any;
}

const commonGrid = {
    label: { nzXs: '24', nzSm: '7', nzMd: '', nzLg: '', nzXl: '' },
    control: { nzXs: '24', nzSm: '15', nzMd: '', nzLg: '', nzXl: '' }
};

export const searchListItem: ISearchListItem[] = [
    {
        id: 1,
        label: '申请人',
        key: 'applyName',
        placeholder: '请输入申请人',
        type: 'text',
        grid: commonGrid
    },
    {
        id: 2,
        label: '客户姓名',
        key: 'name',
        placeholder: '请输入客户姓名',
        type: 'text',
        grid: commonGrid
    },
    {
        id: 3,
        label: '车牌',
        key: 'plate',
        placeholder: '请输入车牌',
        type: 'text',
        grid: commonGrid
    },
    {
        id: 4,
        label: '状态',
        key: 'status',
        placeholder: '请选择状态',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...rebateApplicationStatusList
            ]
        }
    },
    {
        id: 5,
        label: '申请日期',
        key: 'createDate',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 6,
        label: '保险公司',
        key: 'companyCode',
        type: 'select',
        placeholder: '请选择保险公司',
        grid: commonGrid,
        config: {
            options: [
                ...insuranceCompanysList
            ]
        }
    }
];

export interface ISearchListModel {
    applyName: string;
    name: string;
    plate: string;
    status: string;
    createDateBegin: string;
    createDateEnd: string;
    companyCode: string;
    companyAreaCode: string;
    docCateCode: string;
}

export const searchListModel: ISearchListModel = {
    applyName: '',
    name: '',
    plate: '',
    status: '',
    createDateBegin: '',
    createDateEnd: '',
    companyCode: '',
    companyAreaCode: '',
    docCateCode: ''
};

export const tableConifg = {
    thead: [
        { name: '申请人' },
        { name: '申请日期' },
        { name: '客户姓名' },
        { name: '车牌' },
        { name: '保险公司' },
        { name: '类别' },
        { name: '商业险金额' },
        { name: '返现比率' },
        { name: '超出金额' },
        { name: '最高返现比率' },
        { name: '申请种类' },
        { name: '状态' },
        { name: '操作' }
    ]
};

export interface IRebateApplicationItem {
    applyName: string;
    createDate: string;
    name: string;
    plateNumber: string;
    /** 保险公司 */
    companyCode: string;
    companyAreaCode: string;
    /** 类别 */
    cateName: string;
    /** 商业险金额 */
    viPrice: string;
    /** 超出金额 */
    rebatePrice: string;
    /** 最高返现比率 */
    myRebateRatio: number;
    /** 申请种类 */

    /** 状态 */
    status: string;
    [key: string]:any;
}

export const listValue = (): IRebateApplicationItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            id: index + 1,
            applyAmount: null,
            applyName: '王小利',
            applyUserId: 85,
            carProvince: '冀',
            cateName: '平安1',
            changePrice: null,
            companyAreaCode: '13002',
            companyCode: '12001',
            companyName: '平安',
            createDate: '2018-10-14 17:18:42',
            createDateBegin: null,
            createDateEnd: null,
            docCateCode: '00003',
            isChangeSale: null,
            myRebateRatio: 0,
            name: '郝振兴',
            plate: null,
            plateNumber: 'A0E8D0',
            rebatePrice: 839.99,
            remark: '123',
            salesmanRebateRatio: 0,
            status: '37004',
            statusName: '上级申请中',
            taskId: 26188,
            userId: null,
            viPrice: 1938.36
        };
    });
}
