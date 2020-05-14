export const tableConfig = {
    thead: [
        { name: '上传时间' },
        { name: '批次号' },
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
