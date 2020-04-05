export interface IPageInfo {
    total: number;
    pageSize: number;
    pageIndex: number;
    disable?: boolean;
    size?: string;
    pageSizeOptions?: number[];
    showSizeChanger?: boolean;
    [key: string]: any;
}

export interface IPageChangeInfo {
    type: 'pageIndex' | 'pageSize';
    value: number;
    [key: string]: any;
}

export class PaginationService {
    total = 0;
    pageSize = 10;
    pageIndex = 1;
    disable = false;
    size = 'default';
    pageSizeOptions: number[] = [10, 20, 30, 40];
    showSizeChanger = true;

    constructor(pageInfo: IPageInfo) {
        Object.keys(pageInfo).forEach((key: string) => {
            this[key] = pageInfo[key];
        });
    }

    /**
     * @func
     * @desc 是否为最后一页
     */
    isLastPage() {
        return this.total <= (this.pageSize * this.pageIndex);
    }
}
