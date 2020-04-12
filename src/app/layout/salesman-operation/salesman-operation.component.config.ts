export interface ITrackingListItem {
    index: number;
    id: number;
    lastModifyDate: string;
    name: string;
    plate: string;
    level: string;
    [key: string]: any;
}

export const trackingListValue = (): ITrackingListItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            index: index + 1,
            id: 660002,
            lastModifyDate: '2020-4-12',
            plate: '冀A839E4',
            name: '张贵录',
            level: 'E'
        };
    });
};

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
    alreadyDo: number;
    date: string;
    todo: number;
    [key: string]: any;
}

export const calendarValue = (): ICalendarItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            alreadyDo: 0,
            date: `2020/04/1${index}`,
            todo: 200
        };
    });
};

