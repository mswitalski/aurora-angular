import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CachedDutyResolver, DutiesPagedListResolver, DutyResolver} from '../shared/resolver';
import {CreateDutyComponent, DutyManagementComponent} from './management';
import {DutiesListComponent} from './list';
import {EditDutyComponent} from './management/edit';
import {IsUnitLeaderGuard} from '../../shared/service/guard';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: DutiesListComponent,
        data: { title: 'TITLE.UNIT-LEADER.DUTIES' },
        path: 'unitleader/duties',
        resolve: {
            pagedResults: DutiesPagedListResolver
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
        data: { title: 'TITLE.UNIT-LEADER.DUTY-CREATE' },
        path: 'unitleader/duties/create/duty'
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditDutyComponent,
        data: { title: 'TITLE.UNIT-LEADER.DUTY-EDIT' },
        path: 'unitleader/duties/:dutyId/edit',
        resolve: {
            duty: CachedDutyResolver
        }
    }
]);
