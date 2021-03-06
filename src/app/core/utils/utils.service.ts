import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as dayjs from 'dayjs';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { saveAs } from 'file-saver';
import { NzMessageService } from 'ng-zorro-antd';

interface ICommon {
    [key: string]: any;
}

interface IDownloadFileParams {
    httpMethod: string;
    httpUrl: string;
    fileName: string;
    requestParams: ICommon;
}

interface IUploadFileParams {
    httpMethod: string;
    httpUrl: string;
    requestParams: ICommon;
}

@Injectable()
export class UtilsService {
    constructor(
        private http: HttpClient,
        private localCache: LocalStorageService,
        private message: NzMessageService
    ) {

    }

    /**
     * @func
     * @desc 下载文件
     */
    downloadFile(parmas: IDownloadFileParams) {
        const { httpMethod, httpUrl, fileName, requestParams } = parmas;
        const tokenValue = this.localCache.get(LocalStorageItemName.TOKRN);
        const token = tokenValue && tokenValue['value'] || '';

        const header = new HttpHeaders()
            .set('Accept', '*/*')
            .set('Content-type', 'application/json; charset=UTF-8')
            .set('Authorization', token);

        this.http.request(httpMethod, httpUrl, {
            headers: header,
            body: {
                ...requestParams
            },
            responseType: 'blob',
            observe: 'response',
        }).subscribe((res: HttpResponse<Blob>) => {
            if (res.status !== 200 || res.body.size <= 0 || res.body.type === 'application/json') {
                this.message.error(res.statusText);
                return;
            }

            saveAs(res.body, decodeURI(fileName));
        });
    }

    /**
     * @func
     * @desc 上传文件
     */
    uploadFile(parmas: IUploadFileParams) {
        const { httpMethod, httpUrl, requestParams } = parmas;
        const tokenValue = this.localCache.get(LocalStorageItemName.TOKRN);
        const token = tokenValue && tokenValue['value'] || '';

        const header = new HttpHeaders()
            .set('Accept', '*/*')
            .set('Content-type', 'undefined')
            .set('Authorization', token);

        return this.http.request(httpMethod, httpUrl, {
            headers: header,
            body: requestParams
        });
    }

    /**
     * @description 获取Guid
     */
    guid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c): string {
            const r = (Math.random() * 16 | 0); 
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * @description 获取rangePicker中的格式化后的
     */
    getRangeDateFormattedValue(dateArray: Date[] | null, pattern: string = 'YYYY-MM-DD'): Array<string | null> {
        const startIndex = 0;
        const endIndex = 1;
        let start = null;
        let end = null;
        if (dateArray !== null) {
            start = dateArray[startIndex] ? dayjs(dateArray[startIndex]).format(pattern) : null;
            end = dateArray[endIndex] ? dayjs(dateArray[endIndex]).format(pattern) : null;
        }
        return [start, end];
    }

    /**
     * 获取全域名
     */
    getDomain(): string {
        const ret = location.hostname.split('.');

        if (ret.length > 1) {
            // ip情况
            if (/^\d+$/.test(ret[0])) {
                return ret.join('.');
            } else {
                return '.' + ret[ret.length - 2] + '.' + ret[ret.length - 1];
            }
        } else {
            return ret[0];
        }
    }

    /**
     * 获取根域名
     */
    static getRootDomain(): string {
        const ret = location.hostname.split('.');

        if (ret.length > 1) {
            // ip情况
            if (/^\d+$/.test(ret[0])) {
                delete ret[0];
                return ret.join('.');
            } else {
                return '.' + ret[ret.length - 2] + '.' + ret[ret.length - 1];
            }
        } else {
            return ret[0];
        }
    }

    getUploadToken(url: string): Observable<any> {
        return this.http.post(url, {});
    }

    /**
     * 乘法运算：解决浮点运算bug
     * @param arg1
     * @param arg2
     */
    accMul(arg1, arg2) {
        let m = 0;
        const s1 = `${arg1}`;
        const s2 = `${arg2}`;
        try {
            m += s1.split('.')[1].length;
        } catch (e) { }
        try {
            m += s2.split('.')[1].length;
        } catch (e) { }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    }
}
