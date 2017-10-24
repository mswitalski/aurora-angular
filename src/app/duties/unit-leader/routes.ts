import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CreateDutyComponent, DutyManagementComponent} from './management';
import {DutiesListComponent} from './list';
import {DutiesListResolver, DutyResolver} from '../shared/resolver';
import {IsUnitLeaderGuard} from '../../shared/service/guard';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: DutiesListComponent,
        data: { title: 'TITLE.UNIT-LEADER.DUTIES' },
        path: 'unitleader/duties',
        resolve: {
            pagedResults: DutiesListResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: DutyManagementComponent,
        data: { title: 'TITLE.UNIT-LEADER.DUTY' },
        path: 'unitleader/duties/:dutyId',
        resolve: {
            duty: DutyResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: CreateDutyComponent,
        data: { title: 'TITLE.UNIT-LEADER.CREATE-DUTY' },
        path: 'unitleader/duties/create/duty'
    }
]);
