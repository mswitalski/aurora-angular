import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CachedUserResolver, UsersListResolver, UserResolver} from '../shared/resolver';
import {CreateUserComponent, UserManagementComponent} from './user-management';
import {EditDutiesComponent, EditUserComponent} from './user-management/edit';
import {IsUnitLeaderGuard} from '../../shared/service/guard';
import {UsersListComponent} from './list';
import {DutiesListResolver} from '../../duties/shared/resolver';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: UsersListComponent,
        data: { title: 'TITLE.UNIT-LEADER.USERS' },
        path: 'unitleader/users',
        resolve: {
            pagedResults: UsersListResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: UserManagementComponent,
        data: { title: 'TITLE.UNIT-LEADER.USER' },
        path: 'unitleader/users/:userId',
        resolve: {
            user: UserResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: CreateUserComponent,
        data: { title: 'TITLE.UNIT-LEADER.USER-CREATE' },
        path: 'unitleader/users/create/user'
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditUserComponent,
        data: { title: 'TITLE.UNIT-LEADER.USER-EDIT' },
        path: 'unitleader/users/:userId/edit',
        resolve: {
            user: CachedUserResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditDutiesComponent,
        data: { title: 'TITLE.UNIT-LEADER.DUTIES-EDIT' },
        path: 'unitleader/users/:userId/edit/duties',
        resolve: {
            user: CachedUserResolver,
            duties: DutiesListResolver
        }
    }
]);
