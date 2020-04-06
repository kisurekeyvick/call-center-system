import { dictionary } from 'src/app/shared/dictionary/dictionary';

const tableStateList = dictionary.get('customerLlistTableState');

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
        label: '数据',
        key: 'tableState',
        placeholder: '请选择数据状态',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...tableStateList
            ]
        }
    },
    {
        id: 2,
        label: '客户',
        key: 'pvc',
        placeholder: '输入车牌号/车架号/客户名称',
        type: 'text',
        grid: commonGrid,
    }
];

export interface ISearchListModel {
    tableState: string;
    pvc: string;
    [key: string]: any;
}

export const searchListModel: ISearchListModel = {
    tableState: 'all',
    pvc: ''
};

export interface ICustomerItem {
    carId: string;
    plateNo: string;
    customerName: string;
    vinNo: string;
    brandName: string;
    enrollDate: string;
    commercialEndTime: string;
    compulsoryEndTime: string;
    comCode: string;
    customerType: string;
    assigneeName: string;
    modifierTime: string;
    [key: string]: any;
}

export const tableConfig = {
    thead: [
        { name: '车牌号' },
        { name: '客户名称' },
        { name: '车架号' },
        { name: '品牌型号' },
        { name: '注册日期' },
        { name: '商业险到期时间' },
        { name: '交强险到期时间' },
        { name: '上年投保公司' },
        { name: '客户类型' },
        { name: '归属人' },
        { name: '更新时间' }
    ]
};

export const listValue = (): ICustomerItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            carId: `0d3e534a23cb1461c759c0bfb7b1601d-id-${index}`,
            plateNo: '晋A799VQ',
            vinNo: 'WBAKR0101G0U02825',
            engineNo: '02969621N55B30A',
            enrollDate: '2017-01-05',
            brandName: '宝马BMW X5 35i越野车',
            commercialEndTime: '2019-10-30 00:00:00',
            compulsoryEndTime: null,
            comCode: 'CPIC',
            customerName: '林开约',
            customerType: null,
            phone: null,
            phone2: null,
            remarks: null,
            assigneeName: null,
            assigneeId: null,
            vehicleOwnerName: '林开约',
            tenantCode: 'sbh',
            commercialEndDays: 207,
            compulsoryEndDays: null,
            enrollEndDays: null,
            commercialExpectFlag: true,
            compulsoryExpectFlag: false,
            enrollExpectFlag: true,
            modifierTime: '2020-03-26 16:43:56',
            quoteStatus: null,
            carStatus: null,
            renewalStatus: 'SUCCESS',
            followupContent: null,
            nextFollowupTime: null
        };
    });
};
