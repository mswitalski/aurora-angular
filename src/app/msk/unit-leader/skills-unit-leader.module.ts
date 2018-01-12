import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../msh';
import {moduleRouting} from './routes';
import {SkillsListComponent, UserEvaluationsListComponent} from './list';
import {SkillsSharedModule} from '../shared';
import {CreateSkillComponent, EditSkillComponent, SkillManagementComponent} from './skill-management';
import {CachedEvaluationResolver, EvaluationResolver, EvaluationsListResolver} from './resolver';
import {UsersSharedModule} from '../../mus/shared';
import {
    CreateUserEvaluationComponent, EditUserEvaluationComponent,
    UserEvaluationManagementComponent
} from './evaluation-management';
import {IsNotEvaluationOwnerGuard} from './is-not-evaluation-owner-guard.service';

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
        IsNotEvaluationOwnerGuard,
        CachedEvaluationResolver,
        EvaluationResolver,
        EvaluationsListResolver
    ]
})
export class SkillsUnitLeaderModule {
}
