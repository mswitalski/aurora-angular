import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {CreateUserComponent, UserManagementComponent} from './users/user-management';
import {EditPasswordComponent, EditRolesComponent, EditUserComponent} from './users/user-management/edit';
import {moduleRouting} from './routes';
import {UsersListComponent} from './users/list';
import {SharedModule} from '../shared';

@NgModule({
    declarations: [
        CreateUserComponent,
        EditPasswordComponent,
        EditRolesComponent,
        EditUserComponent,
        UserManagementComponent,
        UsersListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class AdminModule {
}
