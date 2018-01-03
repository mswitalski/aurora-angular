import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthenticatedGuard} from './service/guard';
import {ErrorPageComponent} from './error-page';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [AuthenticatedGuard],
        component: ErrorPageComponent,
        data: {title: 'TITLE.ERROR'},
        path: 'error/:code'
    }
]);
