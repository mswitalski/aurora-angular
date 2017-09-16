import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NotAuthenticatedGuard} from './not-authenticated-guard.service';
import {CommonModule} from '@angular/common';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotAuthenticatedGuard]
    }
]);

@NgModule({
    imports: [
        CommonModule,
        moduleRouting,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        NotAuthenticatedGuard
    ]
})

export class LoginModule {
}
