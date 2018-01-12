import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthenticatedGuard} from '../msh/service/guard';
import {DashboardComponent} from './dashboard.component';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [AuthenticatedGuard],
        component: DashboardComponent,
        data: {title: 'TITLE.DASHBOARD'},
        path: 'dashboard'
    }
]);
