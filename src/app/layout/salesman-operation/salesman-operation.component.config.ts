export interface ITrackingListItem {
    id: number;
    updateTime: string;
    customerName: string;
    carNo: string;
    appointmentLevel: string;
    [key: string]: any;
}

export interface IRemind {
    fail: number;
    success: number;
    handled: number;
    invalid: number;
    unhandleTask: number;
    unhandleAppoint: number;
    percent: number;
    [key: string]: any;
}

export const defaultRemidVal = {
    fail: 0,
    success: 0,
    handled: 0,
    invalid: 0,
    unhandleTask: 0,
    unhandleAppoint: 0,
    percent: 0
};

export const remindValue = (): IRemind => {
    return {
        fail: 0,
        success: 0,
        handled: 0,
        invalid: 0,
        unhandleTask: 0,
        unhandleAppoint: 24,
        percent: 5
    };
};

export interface ICalendarItem {
    hadAppointmentNumber: number;
    date: string;
    canAppointmentNumber: number;
    [key: string]: any;
}
