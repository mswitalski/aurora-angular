import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {IsEmployeeGuard} from '../../shared/service/guard';
import {TrainingsListComponent} from './list';
import {FinishedTrainingsListResolver, PlannedTrainingsListResolver} from './resolver';

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
    }
]);
