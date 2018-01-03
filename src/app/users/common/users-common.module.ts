import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {EditPasswordComponent, EditProfileComponent} from './edit';
import {LoggedUserResolver} from './resolver';
import {moduleRouting} from './routes';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../../shared';
import {UsersSharedModule} from '../shared';

@NgModule({
    declarations: [
        EditPasswordComponent,
        EditProfileComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule,
        UsersSharedModule
    ],
    providers: [
        LoggedUserResolver
    ]
})
export class UsersCommonModule {
}
