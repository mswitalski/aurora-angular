import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './mda';
import {AuthenticatedGuard} from './msh/service/guard';

export const rootRouting: ModuleWithProviders = RouterModule.forRoot([
        {
            path: '',
            canActivate: [AuthenticatedGuard],
            component: DashboardComponent,
            data: {title: 'TITLE.DASHBOARD'},
            pathMatch: 'full'
        },
        {
            path: '**',
            redirectTo: '/error/404',
            pathMatch: 'full'
        }
    ],
    {useHash: false}
);
