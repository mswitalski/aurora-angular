import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IsEmployeeGuard} from '../../shared/service/guard';
import {EvaluationsListComponent} from './list';
import {CachedEvaluationResolver, EvaluationsListResolver} from './resolver';
import {
    CreateEvaluationComponent, EditEvaluationComponent,
    EvaluationManagementComponent
} from './evaluation-management';
import {EvaluationResolver} from './resolver/evaluation-resolver.service';
import {SkillsPlainListResolver} from '../shared/resolver';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsEmployeeGuard],
        component: EvaluationsListComponent,
        data: {title: 'TITLE.EMPLOYEE.MY-SKILLS'},
        path: 'employee/skills',
        resolve: {
            evaluations: EvaluationsListResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: EvaluationManagementComponent,
        data: {title: 'TITLE.EMPLOYEE.EVALUATION-DETAILS'},
        path: 'employee/skills/:evaluationId',
        resolve: {
            evaluation: EvaluationResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: EditEvaluationComponent,
        data: {title: 'TITLE.EMPLOYEE.EVALUATION-EDIT'},
        path: 'employee/skills/:evaluationId/edit',
        resolve: {
            evaluation: CachedEvaluationResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: CreateEvaluationComponent,
        data: {title: 'TITLE.EMPLOYEE.EVALUATION-ADD'},
        path: 'employee/skills/add/evaluation',
        resolve: {
            skills: SkillsPlainListResolver,
            evaluations: EvaluationsListResolver
        }
    }
]);
