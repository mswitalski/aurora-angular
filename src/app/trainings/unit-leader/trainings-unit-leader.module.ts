import {NgModule} from '@angular/core';
import {TrainingsSharedModule} from '../shared';
import {CachedTrainingResolver, TrainingResolver, TrainingsListResolver} from './resolver';
import {TrainingsListComponent} from './list';
import {moduleRouting} from './routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared';

@NgModule({
    declarations: [
        TrainingsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule,
        TrainingsSharedModule
    ],
    providers: [
        CachedTrainingResolver,
        TrainingResolver,
        TrainingsListResolver
    ]
})
export class TrainingsUnitLeaderModule {
}
