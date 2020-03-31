import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import dayjs from 'dayjs';

@Injectable()
export class UtilsService {
    constructor(
        private _http: HttpClient
    ) { }

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
        return this._http.post(url, {});
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
