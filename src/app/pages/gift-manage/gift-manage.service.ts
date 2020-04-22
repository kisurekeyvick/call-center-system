import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

@Injectable()
export class GiftService {
    constructor(
        private http: HttpClient) {
    }

    /** 礼品列表查询 */
    queryGiftList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/gift/queryAll`, params);
    }

    /** 礼品新增 */
    addGift(params: ICommon): Observable<any> {
        return this.http.post(`api/gift/insert`, params);
    }

    /** 礼品更新 */
    updateGift(params: ICommon): Observable<any> {
        return this.http.post(`api/gift/update`, params);
    }

    /** 
     * 删除礼品
     * 传id值
     */
    deleteGift(params: ICommon): Observable<any> {
        return this.http.post(`api/speech/delete`, params);
    }
}
