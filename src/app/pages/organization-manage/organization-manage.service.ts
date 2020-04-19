import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IRoleItem, roleValue, permissionAll } from 'src/app/api/api.mock';

interface ICommon {
    [key: string]: any;
}

@Injectable()
export class OrganizationService {
    constructor(
        private http: HttpClient) {
    }

    /** 获取用户列表 */
    queryUserList(params: ICommon): Observable<any> {
        return this.http.get(`api/user/user-list`, params);
    }

    /** 删除用户 */
    deleteUserInfo(params: ICommon): Observable<any> {
        return this.http.post(`api/user/deleteUserInfo`, params);
    }

    /** 新建用户 */
    createUser(params: ICommon): Observable<any> {
        return this.http.post(`api/user/sign-up`, params);
    }

    /** 修改用户 */
    updateUserInfo(params: ICommon): Observable<any> {
        return this.http.post(`api/user/updateUserInfo`, params);
    }

    /** 加载所有角色的权限 */
    loadAllRolePermission(): Observable<any> {
        return this.http.get(`api/permission/all`).pipe(
            catchError(err => of(err)),
            map(() => {
                return permissionAll();
            })
        );
    }

    /** 获取角色列表 */
    queryRole(): Observable<any> {
        return this.http.get(`api/role`, {}).pipe(
            catchError(err => of(err)),
            map(val => {
                const roleList: IRoleItem[] = roleValue();
                return roleList;
            })
        );
    }

    /** 新建角色 */
    addRole(params: ICommon): Observable<any> {
        return this.http.post(`api/permission/all`, params);
    }

    
}
