import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {IsUnitLeaderGuard} from '../../shared/service/guard';
import {TrainingsListComponent} from './list';
import {TrainingsListResolver} from './resolver';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: TrainingsListComponent,
        data: { title: 'TITLE.UNIT-LEADER.TRAININGS' },
        path: 'unitleader/trainings',
        resolve: {
            pagedResults: TrainingsListResolver
        }
    }
]);
