import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { IRoleItem, roleValue } from 'src/app/api/api.mock';

interface ICommon {
    [key: string]: any;
}

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        private localCache: LocalStorageService
    ) {

    }

    /**
     * @func
     * @desc 公共不变的接口 获取角色列表
     */
    queryRole({ readCache } = { readCache: true }): Observable<any> {
        const roleInfo = this.localCache.get(LocalStorageItemName.ROLEINFO);

        if (roleInfo && readCache) {
            return of(roleInfo['value']);
        } else {
            return this.http.get(`api/role`, {}).pipe(
                catchError(err => of(err)),
                map(val => {
                    const roleList: IRoleItem[] = roleValue();
                    this.localCache.set(LocalStorageItemName.ROLEINFO, roleList);
                    return roleList;
                })
            );
        }
    }

    /**
     * @func
     * @desc 公共接口 根据用户Id获取用户信息
     */
    getUserProfile(params: ICommon = {}): Observable<any> {
        return this.http.get(`api/user/profile`, params);
    }

    /**
     * @func
     * @desc 业务员接口 查询首播
     * @param params 
     */
    queryFirstCall(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/customer/queryFirstCall`, params);
    }

    /**
     * @func
     * @desc 业务员接口 预约跟踪接口
     * @param params 
     */
    appointmentTrack(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/customer/appointmentTrack`, params);
    }

    /**
     * @func
     * @desc 业务员接口 预约日历
     * @param params 
     */
    appointmentCalendar(): Observable<any> {
        return this.http.post(`api/customer/appointmentCalendar`, {});
    }

    /**
     * @func
     * @desc 业务员接口 查询符合条件的总数量
     */
    queryTotalNumber(): Observable<any> {
        return this.http.post(`api/customer/queryTotalNumber`, {});
    }
}
