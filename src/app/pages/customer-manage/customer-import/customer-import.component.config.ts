export const tableConfig = {
    thead: [
        { name: '上传时间' },
        { name: '文件名称' },
        { name: '导入数据量' },
        { name: '操作' }
    ]
};

export interface IMessage {
    max: number;
    remain: number;
}

export interface IData {
    batchId: string;
    uploadTime: string;
    fileName: string;
    /** 上传成功/失败/总量 st */
    uploadFailCount: number;
    totalCount: number;
    /** 查询成功 */
    querySuccessCount: number;
    queryDrivingCount: number;
    queryFailCount: number;
    processingCount: number;
    /** 查询进度 */
    progress: string;
    [key: string]: any;
}

export const listValue = (): IData[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            batchId: `736c246c709d4e3f86255ef443ce7f22-index${index}`,
            uploadTime: '2019-07-22 19:13:10',
            fileName: '慢半拍.xlsx',
            uploadFailCount: 0,
            totalCount: 1,
            queryFailCount: 1,
            querySuccessCount: 0,
            queryDrivingCount: 0,
            processingCount: 0,
            progress: 'Completed',
            pending: 0
        };
    });
};
