import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {moduleRouting} from './routes';
import {CommonModule} from '@angular/common';
import {EvaluationsListComponent} from './list';
import {
    CachedEvaluationAsEmployeeResolver, EvaluationAsEmployeeResolver,
    EvaluationsListAsEmployeeResolver
} from './resolver';
import {EditEvaluationComponent, EvaluationManagementComponent} from './evaluation-management';
import {SkillsSharedModule} from '../shared';

@NgModule({
    declarations: [
        EditEvaluationComponent,
        EvaluationsListComponent,
        EvaluationManagementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule,
        SkillsSharedModule
    ],
    providers: [
        CachedEvaluationAsEmployeeResolver,
        EvaluationAsEmployeeResolver,
        EvaluationsListAsEmployeeResolver
    ]
})
export class SkillsEmployeeModule {}
