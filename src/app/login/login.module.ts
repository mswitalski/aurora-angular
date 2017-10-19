import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {moduleRouting} from './routes';
import {NotAuthenticatedGuard} from './not-authenticated-guard.service';
import {SharedModule} from '../shared';

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
