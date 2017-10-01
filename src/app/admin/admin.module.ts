import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared';
import {UsersListComponent, UsersListResolver} from './users/list';
import {IsAdminGuard} from '../shared/service/guard';
import {UserManagementComponent} from './users/user-management';
import {UserResolver} from './users';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsAdminGuard],
        component: UsersListComponent,
        data: { title: 'TITLE.ADMIN.USERS' },
        path: 'admin/users',
        resolve: {
            pagedResults: UsersListResolver
        }
    },
    {
        canActivate: [IsAdminGuard],
        component: UserManagementComponent,
        data: { title: 'TITLE.ADMIN.USER' },
        path: 'admin/users/:username',
        resolve: {
            user: UserResolver
        }
    }
]);

@NgModule({
    declarations: [
        UserManagementComponent,
        UsersListComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        UsersListResolver,
        UserResolver
    ]
})

export class AdminModule {
}
