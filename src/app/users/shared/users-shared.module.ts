import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {CachedUserResolver, RolesResolver, UserResolver, UsersListResolver} from './resolver';
import {
    ExpandedUsersListComponent,
    SimpleUsersListComponent,
    UserDetailsComponent,
    UserFormComponent
} from './component';
import {SharedModule} from '../../shared';
import {} from './component/simple-users-list.component';

@NgModule({
    declarations: [
        ExpandedUsersListComponent,
        SimpleUsersListComponent,
        UserDetailsComponent,
        UserFormComponent
    ],
    exports: [
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
        CachedUserResolver,
        RolesResolver,
        UserResolver,
        UsersListResolver
    ]
})
export class UsersSharedModule {
}
