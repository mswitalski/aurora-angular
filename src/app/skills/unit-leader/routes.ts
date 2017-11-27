import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {IsUnitLeaderGuard} from '../../shared/service/guard';
import {SkillsListComponent} from './list';
import {CachedSkillResolver, SkillResolver, SkillsListResolver} from '../shared/resolver';
import {CreateSkillComponent, EditSkillComponent, SkillManagementComponent} from './skill-management';

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
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: CreateSkillComponent,
        data: { title: 'TITLE.UNIT-LEADER.SKILL-CREATE' },
        path: 'unitleader/skills/create/skill'
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: EditSkillComponent,
        data: { title: 'TITLE.UNIT-LEADER.SKILL-EDIT' },
        path: 'unitleader/skills/:skillId/edit',
        resolve: {
            skill: CachedSkillResolver
        }
    }
]);
