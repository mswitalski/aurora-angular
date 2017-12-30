import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard';

export const rootRouting: ModuleWithProviders = RouterModule.forRoot([
        {
            path: '',
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
