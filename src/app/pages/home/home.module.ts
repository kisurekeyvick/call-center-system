import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AppShareModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        HomeRoutingModule,
        AppShareModule,
        CommonModule,
    ],
    declarations: [
        HomeComponent
    ],
    exports: [],
})
export class HomeModule {}