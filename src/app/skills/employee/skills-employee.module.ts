import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {moduleRouting} from './routes';
import {CommonModule} from '@angular/common';
import {EvaluationsListComponent} from './list';
import {EvaluationsListAsEmployeeResolver} from './resolver';

@NgModule({
    declarations: [
        EvaluationsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        EvaluationsListAsEmployeeResolver
    ]
})
export class SkillsEmployeeModule {}
