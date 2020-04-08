export interface wordItem {
    id?: number;
    name: string;
    content: string;
    [key: string]: any;
}

export const defaultWordItem: wordItem = {
    name: '',
    content: ''
};

export const listValue = (): wordItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            id: index + 1,
            name: `kisure话术demo-${index + 1}`,
            contentDesc: `先生，您看车险是有车一族必须要上的，您也一定会买...`,
            content: '先生，您看车险是有车一族必须要上的，您也一定会买，而且现在办理呢还可以给您赠送一份爱车大礼包，里面包含洗车X次，这么好的活动也不要错过了，好吧'
        };
    });
}