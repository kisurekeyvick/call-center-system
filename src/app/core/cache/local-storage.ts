import { StorageService } from './storage';
import { Injectable } from '@angular/core';

@Injectable()
export default class LocalStorageService extends StorageService {
    constructor() {
        super('local');
    }
}
