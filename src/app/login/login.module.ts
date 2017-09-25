import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './login.component';
import {SharedModule} from '../shared';
import {NotAuthenticatedGuard} from './not-authenticated-guard.service';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [NotAuthenticatedGuard],
        component: LoginComponent,
        data: { title: 'TITLE.LOGIN' },
        path: 'login'
    }
]);

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        NotAuthenticatedGuard
    ]
})

export class LoginModule {
}
