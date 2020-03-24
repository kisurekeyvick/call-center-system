import { Component, OnInit, OnDestroy } from '@angular/core';
import { zoomInAnimation } from 'src/app/shared/animate/index';

@Component({
    selector: 'user-container',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: [
        zoomInAnimation()
    ]
})
export class UserComponent implements OnInit, OnDestroy {
    constructor() {

    }

    ngOnInit() {
    }

    ngOnDestroy() {}
}
