import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

export const rootRouting: ModuleWithProviders = RouterModule.forRoot([
        {
            path: '',
            redirectTo: '/dashboard',
            pathMatch: 'full'
        },
        {
            path: '**',
            redirectTo: '/error/404',
            pathMatch: 'full'
        }
    ],
    {useHash: true}
);
