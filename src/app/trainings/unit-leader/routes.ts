import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {IsUnitLeaderGuard} from '../../shared/service/guard';
import {TrainingsListComponent} from './list';
import {TrainingResolver, TrainingsListResolver} from './resolver';
import {TrainingManagementComponent} from './training-management';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: TrainingsListComponent,
        data: { title: 'TITLE.UNIT-LEADER.TRAININGS' },
        path: 'unitleader/trainings',
        resolve: {
            pagedResults: TrainingsListResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: TrainingManagementComponent,
        data: { title: 'TITLE.UNIT-LEADER.TRAINING-DETAILS' },
        path: 'unitleader/trainings/:trainingId',
        resolve: {
            training: TrainingResolver
        }
    }
]);
