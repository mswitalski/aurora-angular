import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {CachedUserResolver, RolesResolver, UserResolver, UsersListResolver} from './resolver';
import {ExpandedUsersListComponent, UserDetailsComponent, UserFormComponent} from './component';
import {SharedModule} from '../../shared';

@NgModule({
    declarations: [
        ExpandedUsersListComponent,
        UserDetailsComponent,
        UserFormComponent
    ],
    exports: [
        ExpandedUsersListComponent,
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
