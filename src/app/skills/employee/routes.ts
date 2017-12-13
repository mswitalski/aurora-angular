import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IsEmployeeGuard} from '../../shared/service/guard';
import {EvaluationsListComponent} from './list';
import {CachedEvaluationAsEmployeeResolver, EvaluationsListAsEmployeeResolver} from './resolver';
import {
    CreateEvaluationComponent, EditEvaluationComponent,
    EvaluationManagementComponent
} from './evaluation-management';
import {EvaluationAsEmployeeResolver} from './resolver/evaluation-as-employee-resolver.service';
import {SkillsPlainListResolver} from '../shared/resolver';

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
    },
    {
        canActivate: [IsEmployeeGuard],
        component: EditEvaluationComponent,
        data: { title: 'TITLE.EMPLOYEE.EVALUATION-EDIT' },
        path: 'employee/skills/:evaluationId/edit',
        resolve: {
            evaluation: CachedEvaluationAsEmployeeResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: CreateEvaluationComponent,
        data: { title: 'TITLE.EMPLOYEE.EVALUATION-ADD' },
        path: 'employee/skills/add/evaluation',
        resolve: {
            skills: SkillsPlainListResolver,
            evaluations: EvaluationsListAsEmployeeResolver
        }
    }
]);
