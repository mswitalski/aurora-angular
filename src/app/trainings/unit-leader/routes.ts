import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {IsUnitLeaderGuard} from '../../shared/service/guard';
import {TrainingsListComponent} from './list';
import {CachedTrainingResolver, TrainingResolver, TrainingsListResolver} from './resolver';
import {CreateTrainingComponent, TrainingManagementComponent} from './training-management';
import {EditTrainingComponent, EditUsersComponent} from './training-management/edit';
import {AllUsersListResolver} from '../../users/shared/resolver';

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
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: CreateTrainingComponent,
        data: { title: 'TITLE.UNIT-LEADER.TRAINING-CREATE' },
        path: 'unitleader/trainings/create/training'
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditTrainingComponent,
        data: { title: 'TITLE.UNIT-LEADER.TRAINING-EDIT' },
        path: 'unitleader/trainings/:trainingId/edit',
        resolve: {
            training: CachedTrainingResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditUsersComponent,
        data: { title: 'TITLE.UNIT-LEADER.TRAINING-PARTICIPANTS' },
        path: 'unitleader/trainings/:trainingId/edit/participants',
        resolve: {
            training: CachedTrainingResolver,
            users: AllUsersListResolver
        }
    }
]);
