import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../shared';
import {UsersListComponent, UsersListResolver} from './users/list';
import {IsAdminGuard} from '../shared/service/guard';
import {UserManagementComponent} from './users/user-management';
import {CachedUserResolver, UserResolver} from './users';
import {EditPasswordComponent, EditUserComponent} from './users/user-management/edit';
import {EditRolesComponent} from './users/user-management/edit';

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
    },
    {
        canActivate: [IsAdminGuard],
        component: EditUserComponent,
        data: { title: 'TITLE.ADMIN.USER' },
        path: 'admin/users/:username/edit',
        resolve: {
            user: CachedUserResolver
        }
    },
    {
        canActivate: [IsAdminGuard],
        component: EditPasswordComponent,
        data: { title: 'TITLE.ADMIN.PASSWORD' },
        path: 'admin/users/:username/password',
        resolve: {
            user: CachedUserResolver
        }
    },
    {
        canActivate: [IsAdminGuard],
        component: EditRolesComponent,
        data: { title: 'TITLE.ADMIN.ROLES' },
        path: 'admin/users/:username/roles',
        resolve: {
            user: CachedUserResolver
        }
    }
]);

@NgModule({
    declarations: [
        EditUserComponent,
        EditPasswordComponent,
        EditRolesComponent,
        UserManagementComponent,
        UsersListComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        CachedUserResolver,
        UsersListResolver,
        UserResolver
    ]
})

export class AdminModule {
}
