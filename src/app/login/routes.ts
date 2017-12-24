import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './login.component';
import {NotAuthenticatedGuard} from './not-authenticated-guard.service';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [NotAuthenticatedGuard],
        component: LoginComponent,
        data: {title: 'TITLE.LOGIN'},
        path: 'login'
    }
]);
