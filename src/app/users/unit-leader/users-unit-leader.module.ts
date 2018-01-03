import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateUserComponent, UserManagementComponent} from './user-management';
import {EditDutiesComponent, EditUserComponent} from './user-management/edit';
import {moduleRouting} from './routes';
import {SharedModule} from '../../shared';
import {DutiesListComponent, UsersListComponent} from './list';
import {UsersSharedModule} from '../shared';
import {CreateDutyComponent, DutyManagementComponent} from './duty-management';
import {EditDutyComponent} from './duty-management/edit';

@NgModule({
    declarations: [
        CreateDutyComponent,
        CreateUserComponent,
        DutiesListComponent,
        DutyManagementComponent,
        EditDutyComponent,
        EditDutiesComponent,
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
