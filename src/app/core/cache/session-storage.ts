import { StorageService } from './storage';
import { Injectable } from '@angular/core';

@Injectable()
export default class SessionStorageService extends StorageService {
    constructor() {
        super('session');
    }
}
