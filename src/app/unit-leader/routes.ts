import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CachedUserResolver} from '../shared/users/resolver';
import {CreateUserComponent, EditUserComponent, UserManagementComponent} from './users/user-management';
import {IsUnitLeaderGuard} from '../shared/service/guard';
import {UsersListComponent} from './users/list';
import {UsersListResolver, UserResolver} from '../shared/users/resolver';

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
        path: 'unitleader/users/:username',
        resolve: {
            user: UserResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: CreateUserComponent,
        data: { title: 'TITLE.UNIT-LEADER.CREATE-USER' },
        path: 'unitleader/users/create/user'
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditUserComponent,
        data: { title: 'TITLE.UNIT-LEADER.USER' },
        path: 'unitleader/users/:username/edit',
        resolve: {
            user: CachedUserResolver
        }
    }
]);
