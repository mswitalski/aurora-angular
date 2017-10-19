import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CachedUserResolver, UsersListResolver, UserResolver, RolesResolver} from '../shared/users/resolver';
import {CreateUserComponent, UserManagementComponent} from './users/user-management';
import {EditPasswordComponent, EditRolesComponent, EditUserComponent} from './users/user-management/edit';
import {IsAdminGuard} from '../shared/service/guard';
import {UsersListComponent} from './users/list';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
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
            user: CachedUserResolver,
            roles: RolesResolver
        }
    },
    {
        canActivate: [IsAdminGuard],
        component: CreateUserComponent,
        data: { title: 'TITLE.ADMIN.CREATE-USER' },
        path: 'admin/users/create/user',
        resolve: {
            roles: RolesResolver
        }
    }
]);
