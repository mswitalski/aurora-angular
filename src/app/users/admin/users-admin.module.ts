import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CreateUserComponent, UserManagementComponent} from './user-management';
import {EditPasswordComponent, EditRolesComponent, EditUserComponent} from './user-management/edit';
import {moduleRouting} from './routes';
import {UsersListComponent} from './list';
import {SharedModule} from '../../shared';
import {UsersSharedModule} from '../shared';

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
        SharedModule,
        UsersSharedModule
    ]
})
export class UsersAdminModule {
}
