import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../../shared';
import {moduleRouting} from './routes';
import {SkillsListComponent, UserEvaluationsListComponent} from './list';
import {SkillsSharedModule} from '../shared';
import {CreateSkillComponent, EditSkillComponent, SkillManagementComponent} from './skill-management';
import {UserCachedEvaluationResolver, UserEvaluationResolver, UserEvaluationsListResolver} from './resolver';
import {UsersSharedModule} from '../../users/shared';
import {
    CreateUserEvaluationComponent, EditUserEvaluationComponent,
    UserEvaluationManagementComponent
} from './evaluation-management';

@NgModule({
    declarations: [
        CreateSkillComponent,
        CreateUserEvaluationComponent,
        EditSkillComponent,
        EditUserEvaluationComponent,
        SkillsListComponent,
        SkillManagementComponent,
        UserEvaluationManagementComponent,
        UserEvaluationsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule,
        SkillsSharedModule,
        UsersSharedModule
    ],
    providers: [
        UserCachedEvaluationResolver,
        UserEvaluationResolver,
        UserEvaluationsListResolver
    ]
})
export class SkillsUnitLeaderModule {
}
