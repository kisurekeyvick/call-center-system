import { Component, OnInit, OnDestroy } from '@angular/core';
import { menus, IMenu } from 'src/app/shared/menu/menus';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AppAdminLayoutComponent implements OnInit, OnDestroy {
    public isCollapsed: boolean;
    public layoutMenus: IMenu[] = [];
    public items = [
        { name: 'name' },
        { age: 'age' },
        { sex: 'sex' }
    ];

    constructor(
    ) {
        this.isCollapsed = false;
        this.layoutMenus = menus.get('admin');
        console.log('layoutMenus', this.layoutMenus);
    }

    ngOnInit() {
    }

    ngOnDestroy() {}
}


