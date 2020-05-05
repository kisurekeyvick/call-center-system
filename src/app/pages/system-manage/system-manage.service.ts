import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

@Injectable()
export class SystemManageService {
    constructor(
        private http: HttpClient) {
    }

    /** 话术列表查询 */
    querySpeechList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/speech/queryAll`, params);
    }

    /** 新增话术 */
    addSpeech(params: ICommon): Observable<any> {
        return this.http.post(`api/speech/insert`, params);
    }

    /** 更新话术 */
    updateSpeech(params: ICommon): Observable<any> {
        return this.http.post(`api/speech/update`, params);
    }

    /** 删除话术 */
    deleteSpeech(params: ICommon): Observable<any> {
        return this.http.post(`api/speech/delete`, params);
    }



    /** 战败原因列表查询 */
    queryDefeatreasonList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/defeatreason/queryAll`, params);
    }

    /** 增加战败原因 */
    addDefeatreason(params: ICommon): Observable<any> {
        return this.http.post(`api/defeatreason/insert`, params);
    }

    /** 更新战败原因 */
    updateDefeatreason(params: ICommon): Observable<any> {
        return this.http.post(`api/defeatreason/update`, params);
    }

    /** 删除战败原因 */
    deleteDefeatreason(params: ICommon): Observable<any> {
        return this.http.post(`api/defeatreason/delete`, params);
    }

    

    /** 返利列表查询 */
    queryRebateList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/rebate/config/queryAll`, params);
    }

    /** 新增返利 */
    addRebate(params: ICommon): Observable<any> {
        return this.http.post(`api/rebate/config/insert`, params);
    }

    /** 更新返利 */
    updateRebate(params: ICommon): Observable<any> {
        return this.http.post(`api/rebate/config/update`, params);
    }

    /** 删除返利 */
    deleteRebate(params: ICommon): Observable<any> {
        return this.http.post(`api/rebate/config/delete`, params);
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
        return this.http.post(`api/gift/delete`, params);
    }
}
