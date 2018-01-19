import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IsUnitLeaderGuard} from '../../msh/service/guard';
import {SkillsListComponent, UserEvaluationsListComponent} from './list';
import {CachedSkillResolver, SkillResolver, SkillsListResolver, SkillsPlainListResolver} from '../shared/resolver';
import {CreateSkillComponent, EditSkillComponent, SkillManagementComponent} from './skill-management';
import {CachedEvaluationResolver, EvaluationResolver, EvaluationsListResolver} from './resolver';
import {
    CreateUserEvaluationComponent, EditUserEvaluationComponent,
    UserEvaluationManagementComponent
} from './evaluation-management';
import {CachedUserResolver} from '../../mus/shared/resolver';
import {IsNotEvaluationOwnerGuard} from './is-not-evaluation-owner-guard.service';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: SkillsListComponent,
        data: {title: 'TITLE.UNIT-LEADER.SKILLS'},
        path: 'unitleader/skills',
        resolve: {
            pagedResults: SkillsListResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: SkillManagementComponent,
        data: {title: 'TITLE.UNIT-LEADER.SKILL'},
        path: 'unitleader/skills/:skillId',
        resolve: {
            skill: SkillResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: CreateSkillComponent,
        data: {title: 'TITLE.UNIT-LEADER.SKILL-CREATE'},
        path: 'unitleader/skills/create/skill'
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditSkillComponent,
        data: {title: 'TITLE.UNIT-LEADER.SKILL-EDIT'},
        path: 'unitleader/skills/:skillId/edit',
        resolve: {
            skill: CachedSkillResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: UserEvaluationsListComponent,
        data: {title: 'TITLE.UNIT-LEADER.USER-SKILLS'},
        path: 'unitleader/users/:userId/skills',
        resolve: {
            evaluations: EvaluationsListResolver,
            user: CachedUserResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: UserEvaluationManagementComponent,
        data: {title: 'TITLE.UNIT-LEADER.EVALUATION-DETAILS'},
        path: 'unitleader/users/:userId/skills/:evaluationId',
        resolve: {
            evaluation: EvaluationResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard, IsNotEvaluationOwnerGuard],
        component: EditUserEvaluationComponent,
        data: {title: 'TITLE.UNIT-LEADER.EVALUATION-EDIT'},
        path: 'unitleader/users/:userId/skills/:evaluationId/edit',
        resolve: {
            evaluation: CachedEvaluationResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard, IsNotEvaluationOwnerGuard],
        component: CreateUserEvaluationComponent,
        data: {title: 'TITLE.UNIT-LEADER.EVALUATION-ADD'},
        path: 'unitleader/users/:userId/skills/add/evaluation',
        resolve: {
            skills: SkillsPlainListResolver,
            evaluations: EvaluationsListResolver,
            user: CachedUserResolver
        }
    }
]);
