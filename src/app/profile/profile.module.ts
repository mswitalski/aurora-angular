import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {EditPasswordComponent, EditProfileComponent} from './edit';
import {LoggedUserResolver} from './logged-user-resolver.service';
import {moduleRouting} from './routes';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../shared';

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
        SharedModule
    ],
    providers: [
        LoggedUserResolver
    ]
})
export class ProfileModule {
}
