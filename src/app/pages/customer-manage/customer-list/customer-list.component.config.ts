import { dictionary } from 'src/app/shared/dictionary/dictionary';

const tableStateList = dictionary.get('customerLlistTableState');
export const companyList = dictionary.get('insuranceCompanys');
const ownerShipList = dictionary.get('category');
export const renewalStateList = dictionary.get('renewalState');
export const customerStatusList = dictionary.get('customerStatus');
export const appointmentLevelList = dictionary.get('appointmentLevel');

export interface ISearchListItem {
    id: number;
    label?: string;
    placeholder?: string;
    type: string;
    config?: any;
    [key: string]: any;
}

export const searchListLayout = {
    nzXs: '24',  
    nzMd: '12', 
    nzLg: '8', 
    nzXl: '6',
    nzXXl: '6'
};

const commonGrid = {
    label: { nzXs: '24', nzSm: '10', nzMd: '', nzLg: '', nzXl: '' },
    control: { nzXs: '24', nzSm: '14', nzMd: '', nzLg: '', nzXl: '' }
};

export const searchListItem: ISearchListItem[] = [
    {
        id: 1,
        label: '客户姓名',
        key: 'customerName',
        placeholder: '请输入客户姓名',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 2,
        label: '手机号',
        key: 'customerPhone',
        placeholder: '请输入客户手机号',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 6,
        label: '车牌',
        key: 'carNo',
        placeholder: '输入车牌',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 10,
        label: '上年保险公司',
        key: 'lastCompanyCode',
        placeholder: '请选择上年保险公司',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...companyList
            ]
        }
    },
    {
        id: 15,
        label: '投保公司',
        key: 'companyCode',
        placeholder: '请选择投保公司',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...companyList
            ]
        }
    },
    {
        id: 16,
        label: '预约级别',
        key: 'appointmentLevel',
        placeholder: '请选择预约级别',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...appointmentLevelList
            ]
        }
    },
    {
        id: 14,
        label: '初登日期',
        key: 'registerTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 17,
        label: '保险日期',
        key: 'insuranceTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 18,
        label: '名单发放日',
        key: 'distributionTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 3,
        label: '客户状态',
        key: 'handleState',
        placeholder: '请选择状态',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...customerStatusList
            ]
        }
    },
    {
        id: 19,
        label: '预约时间',
        key: 'appointmentTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 20,
        label: '最后操作时间',
        key: 'updateTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 21,
        label: '业务员',
        key: 'userId',
        placeholder: '请选择业务员',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
            ]
        }
    },
    // {
    //     id: 5,
    //     label: '品牌',
    //     key: 'brandName',
    //     placeholder: '输入品牌',
    //     type: 'text',
    //     grid: commonGrid,
    // },
    // {
    //     id: 7,
    //     label: '是否在职',
    //     key: 'inJob',
    //     placeholder: '请选择是否在职',
    //     type: 'select',
    //     grid: commonGrid,
    //     config: {
    //         options: [{ name: '是', value: true }, { name: '否', value: false }]
    //     }
    // },
    // {
    //     id: 8,
    //     label: '是否高端车',
    //     key: 'isHigh',
    //     placeholder: '请选择是否高端车',
    //     type: 'select',
    //     grid: commonGrid,
    //     config: {
    //         options: [{ name: '是', value: true }, { name: '否', value: false }]
    //     }
    // },
    // {
    //     id: 9,
    //     label: '是否过户',
    //     key: 'isTransfer',
    //     placeholder: '请选择是是否过户',
    //     type: 'select',
    //     grid: commonGrid,
    //     config: {
    //         options: [{ name: '是', value: true }, { name: '否', value: false }]
    //     }
    // },
    // {
    //     id: 11,
    //     label: '指导价',
    //     placeholder: '',
    //     type: 'numberRange',
    //     grid: commonGrid,
    //     config: {
    //         start: {
    //             key: 'minPurchasePrice',
    //             min: 0,
    //             max: Infinity,
    //             step: 1
    //         },
    //         end: {
    //             key: 'maxPurchasePrice',
    //             min: 0,
    //             max: Infinity,
    //             step: 1
    //         }
    //     }
    // },
    // {
    //     id: 12,
    //     label: '车辆所属',
    //     placeholder: '请选择车辆所属',
    //     key: 'ownerShip',
    //     type: 'select',
    //     grid: commonGrid,
    //     config: {
    //         options: [
    //             ...ownerShipList
    //         ]
    //     }
    // },
    // {
    //     id: 13,
    //     label: '是否续保车',
    //     placeholder: '请选择是否续保车',
    //     key: 'renewalState',
    //     type: 'select',
    //     grid: commonGrid,
    //     config: {
    //         options: [{ name: '是', value: '1' }, { name: '否', value: '2' }]
    //     }
    // },
];

export interface ISearchListModel {
    customerName: string;
    customerPhone: string;
    carNo: string;
    lastCompanyCode: string;
    companyCode: string;
    appointmentLevel: string;
    registerTime: string[];
    insuranceTime: string[];
    distributionTime: string[];
    handleState: string;
    appointmentTime: string[];
    updateTime: string[];
    userId: string;
    [key: string]: any;
}

export const searchListModel: ISearchListModel = {
    customerName: null,
    customerPhone: null,
    carNo: null,
    lastCompanyCode: null,
    companyCode: null,
    appointmentLevel: null,
    registerTime: [],
    insuranceTime: [],
    distributionTime: [],
    handleState: null,
    appointmentTime: [],
    updateTime: [],
    userId: null
};

export interface ICustomerItem {
    carId: string;
    carNo: string;
    customerName: string;
    vinNo: string;
    brandName: string;
    enrollDate: string;
    commercialEndTime: string;
    compulsoryEndTime: string;
    lastCompanyCode: string;
    lastCompanyName: string;
    customerType: string;
    assigneeName: string;
    modifierTime: string;
    [key: string]: any;
}

export const tableConfig = {
    thead: [
        { name: '姓名', type: 'fixed-left' },
        { name: '手机号' },
        { name: '车牌' },
        { name: '上年保险公司' },
        { name: '初登日期' },
        { name: '保险到期日' },
        { name: '名单发放日' },
        { name: '预约时间' },
        { name: '最后操作时间' },
        { name: '客户状态' }
    ]
};

export interface ISalesman {
    memberId: number;
    regionId: number;
    regionName: string;
    salesmanName: string;
    teamId: number;
    teamName: string;
    [key: string]: any;
}
