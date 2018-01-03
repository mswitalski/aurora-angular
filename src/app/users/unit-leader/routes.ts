import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {
    CachedDutyResolver, CachedUserResolver, DutiesListResolver, DutiesPagedListResolver, DutyResolver, UserResolver,
    UsersListResolver
} from '../shared/resolver';
import {CreateUserComponent, UserManagementComponent} from './user-management';
import {EditDutiesComponent, EditUserComponent} from './user-management/edit';
import {IsUnitLeaderGuard} from '../../shared/service/guard';
import {DutiesListComponent, UsersListComponent} from './list';
import {CreateDutyComponent, DutyManagementComponent} from './duty-management';
import {EditDutyComponent} from './duty-management/edit';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: UsersListComponent,
        data: {title: 'TITLE.UNIT-LEADER.USERS'},
        path: 'unitleader/users',
        resolve: {
            pagedResults: UsersListResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: UserManagementComponent,
        data: {title: 'TITLE.UNIT-LEADER.USER'},
        path: 'unitleader/users/:userId',
        resolve: {
            user: UserResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: CreateUserComponent,
        data: {title: 'TITLE.UNIT-LEADER.USER-CREATE'},
        path: 'unitleader/users/create/user'
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditUserComponent,
        data: {title: 'TITLE.UNIT-LEADER.USER-EDIT'},
        path: 'unitleader/users/:userId/edit',
        resolve: {
            user: CachedUserResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditDutiesComponent,
        data: {title: 'TITLE.UNIT-LEADER.DUTIES-EDIT'},
        path: 'unitleader/users/:userId/edit/duties',
        resolve: {
            user: CachedUserResolver,
            duties: DutiesListResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: DutiesListComponent,
        data: {title: 'TITLE.UNIT-LEADER.DUTIES'},
        path: 'unitleader/duties',
        resolve: {
            pagedResults: DutiesPagedListResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: DutyManagementComponent,
        data: {title: 'TITLE.UNIT-LEADER.DUTY'},
        path: 'unitleader/duties/:dutyId',
        resolve: {
            duty: DutyResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: CreateDutyComponent,
        data: {title: 'TITLE.UNIT-LEADER.DUTY-CREATE'},
        path: 'unitleader/duties/create/duty'
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditDutyComponent,
        data: {title: 'TITLE.UNIT-LEADER.DUTY-EDIT'},
        path: 'unitleader/duties/:dutyId/edit',
        resolve: {
            duty: CachedDutyResolver
        }
    }
]);
