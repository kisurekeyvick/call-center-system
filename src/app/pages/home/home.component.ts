import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';

@Component({
    selector: 'home-container',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class HomeComponent implements OnInit, OnDestroy {
    list = Array.apply(null, Array(10)).map((i, index) => index);

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {}
}
