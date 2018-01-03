import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared';
import {EvaluationFormComponent, SkillFormComponent, SkillsListComponent} from './component';
import {CachedSkillResolver, SkillResolver, SkillsListResolver, SkillsPlainListResolver} from './resolver';

@NgModule({
    declarations: [
        EvaluationFormComponent,
        SkillFormComponent,
        SkillsListComponent
    ],
    exports: [
        EvaluationFormComponent,
        SkillFormComponent,
        SkillsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        CachedSkillResolver,
        SkillResolver,
        SkillsListResolver,
        SkillsPlainListResolver
    ]
})
export class SkillsSharedModule {
}
