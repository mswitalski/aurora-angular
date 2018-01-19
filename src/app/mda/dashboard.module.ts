import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../msh';
import {moduleRouting} from './routes';
import {TasksSharedModule} from '../mta/shared';
import {TrainingsSharedModule} from '../mtr/shared';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        SharedModule,
        TasksSharedModule,
        TrainingsSharedModule
    ]
})
export class DashboardModule {
}
