import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {SharedModule} from '../shared/shared.module';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'login',
        component: LoginComponent
    }
]);

@NgModule({
    imports: [
        moduleRouting,
        SharedModule
    ],
    declarations: [
        LoginComponent
    ]
})

export class LoginModule {
}
