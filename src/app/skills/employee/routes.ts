import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IsEmployeeGuard} from '../../shared/service/guard';
import {EvaluationsListComponent} from './list';
import {EvaluationsListAsEmployeeResolver} from './resolver';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsEmployeeGuard],
        component: EvaluationsListComponent,
        data: { title: 'TITLE.EMPLOYEE.MY-SKILLS' },
        path: 'employee/skills',
        resolve: {
            evaluations: EvaluationsListAsEmployeeResolver
        }
    }
]);
