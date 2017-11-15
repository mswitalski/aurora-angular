import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CreateUserComponent, UserManagementComponent} from './user-management';
import {DutiesSharedModule} from '../../duties/shared';
import {EditDutiesComponent, EditUserComponent} from './user-management/edit';
import {moduleRouting} from './routes';
import {SharedModule} from '../../shared';
import {UsersListComponent} from './list';
import {UsersSharedModule} from '../shared';

@NgModule({
    declarations: [
        CreateUserComponent,
        EditDutiesComponent,
        EditUserComponent,
        UsersListComponent,
        UserManagementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DutiesSharedModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule,
        UsersSharedModule
    ]
})
export class UsersUnitLeaderModule {
}
