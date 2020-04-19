export interface IformModel {
    id: number;
    name: string;
    accountStatus: string;
    phone: string;
    username: string;
    password: string;
    departmentCode: string;
    roleCode: string;
    [key: string]: any;
}

export const defaultFormModel = {
    id: null,
    name: '',
    accountStatus: '',
    phone: '',
    username: '',
    password: '',
    departmentCode: '',
    roleCode: ''
};
