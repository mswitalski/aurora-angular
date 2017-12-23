import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {IsEmployeeGuard} from '../../shared/service/guard';
import {TrainingsListComponent} from './list';
import {FinishedTrainingsListResolver, PlannedTrainingsListResolver, TrainingResolver} from './resolver';
import {TrainingManagementComponent} from './training-management';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsEmployeeGuard],
        component: TrainingsListComponent,
        data: { title: 'TITLE.EMPLOYEE.MY-TRAININGS' },
        path: 'employee/trainings',
        resolve: {
            finishedPagedResults: FinishedTrainingsListResolver,
            plannedPagedResults: PlannedTrainingsListResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: TrainingManagementComponent,
        data: { title: 'TITLE.EMPLOYEE.TRAINING-DETAILS' },
        path: 'employee/trainings/:trainingId',
        resolve: {
            training: TrainingResolver
        }
    }
]);
