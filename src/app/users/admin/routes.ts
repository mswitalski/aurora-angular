import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CachedUserResolver, UsersListResolver, UserResolver, RolesResolver} from '../shared/resolver';
import {CreateUserComponent, UserManagementComponent} from './user-management';
import {EditPasswordComponent, EditRolesComponent, EditUserComponent} from './user-management/edit';
import {IsAdminGuard} from '../../shared/service/guard';
import {UsersListComponent} from './list';

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
        path: 'admin/users/:userId',
        resolve: {
            user: UserResolver
        }
    },
    {
        canActivate: [IsAdminGuard],
        component: EditUserComponent,
        data: { title: 'TITLE.ADMIN.USER' },
        path: 'admin/users/:userId/edit',
        resolve: {
            user: CachedUserResolver
        }
    },
    {
        canActivate: [IsAdminGuard],
        component: EditPasswordComponent,
        data: { title: 'TITLE.ADMIN.PASSWORD' },
        path: 'admin/users/:userId/password',
        resolve: {
            user: CachedUserResolver
        }
    },
    {
        canActivate: [IsAdminGuard],
        component: EditRolesComponent,
        data: { title: 'TITLE.ADMIN.ROLES' },
        path: 'admin/users/:userId/roles',
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
