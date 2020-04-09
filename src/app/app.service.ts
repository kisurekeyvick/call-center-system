import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

export interface ILoginSubject {
    needLogin: boolean;
    url: string;
}

@Injectable()
export class AppService {
    loginSubject: Subject<ILoginSubject> = new Subject<ILoginSubject>();

    constructor(
        private http: HttpClient) {
    }
}
