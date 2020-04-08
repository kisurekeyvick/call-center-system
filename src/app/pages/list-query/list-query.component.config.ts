import { dictionary } from 'src/app/shared/dictionary/dictionary';

const appointmentLevelList = dictionary.get('appointmentLevel');
const preInsuranceCompanyList = dictionary.get('insuranceCompanys');
const processingStateList = dictionary.get('processingState');
const isRenewalList = dictionary.get('isRenewal');

export interface ISearchListItem {
    id: number;
    label?: string;
    placeholder?: string;
    type: string;
    config?: any;
    [key: string]: any;
}

const commonGrid = {
    label: { nzXs: '24', nzSm: '9', nzMd: '', nzLg: '', nzXl: '' },
    control: { nzXs: '24', nzSm: '15', nzMd: '', nzLg: '', nzXl: '' }
};

export const searchListItem: ISearchListItem[] = [
    {
        id: 1,
        label: '姓名',
        key: 'name',
        placeholder: '请输入姓名',
        type: 'text',
        grid: commonGrid
    },
    {
        id: 2,
        label: '手机号',
        key: 'phone',
        placeholder: '请输入手机号',
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
        label: '保险到期日',
        key: 'insuranceDueDate',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 5,
        label: '预约级别',
        key: 'appointmentLevel',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...appointmentLevelList
            ]
        }
    },
    {
        id: 6,
        label: '预约时间',
        key: 'appointmentTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 7,
        label: '上年投保公司',
        key: 'preInsuranceCompany',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...preInsuranceCompanyList
            ]
        }
    },
    {
        id: 8,
        label: '本次投保公司',
        key: 'thisInsuranceCompany',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...preInsuranceCompanyList
            ]
        }
    },
    {
        id: 9,
        label: '名单发放日',
        key: 'distributionDate',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 10,
        label: '团队',
        key: 'teamId',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
            ]
        }
    },
    {
        id: 11,
        label: '业务员',
        key: 'salesmanId',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
            ]
        }
    },
    {
        id: 12,
        label: '名单处理状态',
        key: 'dialStatus',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...processingStateList
            ]
        }
    },
    {
        id: 13,
        label: '是否续保',
        key: 'isRenewal',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...isRenewalList
            ]
        }
    }
];

export interface ISearchListModel {
    name: string;
    phone: string;
    plate: string;
    insuranceDueDate: string;
    insuranceDueDateBegin: string;
    insuranceDueDateEnd: string;
    appointmentLevel: string;
    appointmentTime: string;
    appointmentTimeBegin: string;
    appointmentTimeEnd: string;
    preInsuranceCompany: string;
    thisInsuranceCompany: string;
    distributionDate: string;
    distributionDateBegin: string;
    distributionDateEnd: string;
    teamId: string;
    salesmanId: string;
    dialStatus: string;
    isRenewal: string;
}

export const searchListModel: ISearchListModel = {
    name: '',
    phone: '',
    plate: '',
    insuranceDueDate: '',
    insuranceDueDateBegin: '',
    insuranceDueDateEnd: '',
    appointmentLevel: '',
    appointmentTime:'',
    appointmentTimeBegin: '',
    appointmentTimeEnd: '',
    preInsuranceCompany: '',
    thisInsuranceCompany: '',
    distributionDate: '',
    distributionDateBegin: '',
    distributionDateEnd: '',
    teamId: '',
    salesmanId: '',
    dialStatus: '',
    isRenewal: ''
};

export const tableConifg = {
    thead: [
        { name: '姓名' },
        { name: '手机号' },
        { name: '车牌' },
        { name: '上年保险公司' },
        { name: '保险到期日' },
        { name: '名单发放日' },
        { name: '预约时间' },
        { name: '团队' },
        { name: '业务员' },
        { name: '类型' },
        { name: '处理状态' },
        { name: '操作' }
    ]
};

export interface IQueryListItem {
    name: string;
    phone: string;
    plate: string;
    preInsuranceCompanyName: string;
    insuranceDueDate: string;
    handleDate: string;
    distributeDate: string;
    teamName: string;
    salesmanName: string;
    isRenewalName: string;
    dialStatusName: string;
    [key: string]: any;
}

export const listValue = (): IQueryListItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            id: index + 1,
            appointmentId: null,
            appointmentLevel: null,
            appointmentStatus: null,
            appointmentTime: null,
            appointmentTimeBegin: null,
            appointmentTimeEnd: null,
            batch: null,
            brandModel: null,
            currentPageNum: null,
            dialStatus: '11006',
            dialStatusName: '名单无效',
            distributeDate: null,
            distributionDateBegin: null,
            distributionDateEnd: null,
            failureReasons: '08004',
            firstRegisterDate: '20151010',
            firstRegisterDateBegin: null,
            firstRegisterDateEnd: null,
            handleDate: '2018-10-05',
            insuranceDueDate: '2018-10-16',
            insuranceDueDateBegin: null,
            insuranceDueDateEnd: null,
            isFlashSend: 0,
            isRenewal: 0,
            isRenewalName: '非续保',
            modifyDate: '20181107221132',
            modifyDateBegin: null,
            modifyDateEnd: null,
            name: '李其美',
            otherLink: null,
            outDocType: null,
            ownerId: 78018,
            pageSize: null,
            phone: '13862184016',
            plate: null,
            plateNumber: 'E5F38B',
            preInsuranceCompany: null,
            preInsuranceCompanyName: null,
            priceCheckStatus: null,
            province: '苏',
            remark: null,
            salesmanId: null,
            salesmanName: '王小利',
            sortArrStr: null,
            sortList: null,
            startPageSize: null,
            taskId: 24587,
            teamId: null,
            teamName: '石家庄团队',
            thisInsuranceCompany: null,
            userId: 85,
            viFlag: null
        };
    });
};
