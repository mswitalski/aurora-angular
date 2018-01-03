import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../shared';
import {moduleRouting} from './routes';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        SharedModule
    ]
})
export class DashboardModule {
}
