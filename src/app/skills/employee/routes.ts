import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IsEmployeeGuard} from '../../shared/service/guard';
import {EvaluationsListComponent} from './list';
import {EvaluationsListAsEmployeeResolver} from './resolver';
import {EvaluationManagementComponent} from './evaluation-management';
import {EvaluationAsEmployeeResolver} from './resolver/evaluation-as-employee-resolver.service';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsEmployeeGuard],
        component: EvaluationsListComponent,
        data: { title: 'TITLE.EMPLOYEE.MY-SKILLS' },
        path: 'employee/skills',
        resolve: {
            evaluations: EvaluationsListAsEmployeeResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: EvaluationManagementComponent,
        data: { title: 'TITLE.EMPLOYEE.EVALUATION-DETAILS' },
        path: 'employee/skills/:evaluationId',
        resolve: {
            evaluation: EvaluationAsEmployeeResolver
        }
    }
]);
