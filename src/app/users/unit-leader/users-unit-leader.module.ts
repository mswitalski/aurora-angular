import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {moduleRouting} from './routes';
import {SharedModule} from '../../shared';
import {CreateUserComponent, EditUserComponent, UserManagementComponent} from './user-management';
import {UsersListComponent} from './list';
import {UsersSharedModule} from '../shared';

@NgModule({
    declarations: [
        CreateUserComponent,
        EditUserComponent,
        UsersListComponent,
        UserManagementComponent
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
export class UsersUnitLeaderModule {
}
