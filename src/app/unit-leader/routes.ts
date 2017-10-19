import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IsUnitLeaderGuard} from '../shared/service/guard/is-unit-leader-guard.service';
import {UsersListComponent} from './users/list/users-list.component';
import {UsersListResolver} from '../shared/users/resolver/users-list-resolver.service';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: UsersListComponent,
        data: { title: 'TITLE.UNIT-LEADER.USERS' },
        path: 'unitleader/users',
        resolve: {
            pagedResults: UsersListResolver
        }
    }
]);
