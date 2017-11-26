import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {IsUnitLeaderGuard} from '../../shared/service/guard';
import {SkillsListComponent} from './list';
import {SkillsListResolver} from '../shared/resolver';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: SkillsListComponent,
        data: { title: 'TITLE.UNIT-LEADER.SKILLS' },
        path: 'unitleader/skills',
        resolve: {
            pagedResults: SkillsListResolver
        }
    }
]);
