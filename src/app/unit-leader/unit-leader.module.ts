import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {moduleRouting} from './routes';
import {SharedModule} from '../shared';
import {CreateUserComponent, EditUserComponent, UserManagementComponent} from './users/user-management';
import {UsersListComponent} from './users/list';

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
        SharedModule
    ]
})
export class UnitLeaderModule {
}
