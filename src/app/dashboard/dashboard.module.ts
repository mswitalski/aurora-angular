import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AuthenticatedGuard} from '../shared/service/guard';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../shared';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [AuthenticatedGuard],
        component: DashboardComponent,
        data: { title: 'TITLE.DASHBOARD' },
        path: 'dashboard'
    }
]);

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
