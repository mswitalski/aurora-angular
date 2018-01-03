import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {
    AllUsersListResolver, CachedDutyResolver, CachedUserResolver, DutiesListResolver, DutiesPagedListResolver,
    DutyResolver, RolesResolver, UserResolver, UsersListResolver
} from './resolver';
import {
    DutyFormComponent, ExpandedUsersListComponent, SimpleUsersListComponent, UserDetailsComponent,
    UserFormComponent
} from './component';
import {SharedModule} from '../../shared';

@NgModule({
    declarations: [
        DutyFormComponent,
        ExpandedUsersListComponent,
        SimpleUsersListComponent,
        UserDetailsComponent,
        UserFormComponent
    ],
    exports: [
        DutyFormComponent,
        ExpandedUsersListComponent,
        SimpleUsersListComponent,
        UserDetailsComponent,
        UserFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        AllUsersListResolver,
        CachedUserResolver,
        CachedDutyResolver,
        DutiesListResolver,
        DutiesPagedListResolver,
        DutyResolver,
        RolesResolver,
        UserResolver,
        UsersListResolver
    ]
})
export class UsersSharedModule {
}
