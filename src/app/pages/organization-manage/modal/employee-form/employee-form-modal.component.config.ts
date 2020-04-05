export interface IformModel {
    name: string;
    accountStatus: string;
    phone: string;
    username: string;
    password: string;
    departmentCode: string;
    roleCode: string;
}

export const defaultFormModel = {
    name: '',
    accountStatus: '',
    phone: '',
    username: '',
    password: '',
    departmentCode: '',
    roleCode: ''
};
