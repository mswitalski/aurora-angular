import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {IsUnitLeaderGuard} from '../../shared/service/guard';
import {SkillsListComponent} from './list';
import {SkillResolver, SkillsListResolver} from '../shared/resolver';
import {SkillManagementComponent} from './skill-management';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: SkillsListComponent,
        data: { title: 'TITLE.UNIT-LEADER.SKILLS' },
        path: 'unitleader/skills',
        resolve: {
            pagedResults: SkillsListResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: SkillManagementComponent,
        data: { title: 'TITLE.UNIT-LEADER.SKILL' },
        path: 'unitleader/skills/:skillId',
        resolve: {
            skill: SkillResolver
        }
    }
]);
