import {NgModule} from '@angular/core';
import {TrainingsSharedModule} from '../shared';
import {FinishedTrainingsListResolver, PlannedTrainingsListResolver, TrainingResolver} from './resolver';

@NgModule({
    imports: [
        TrainingsSharedModule,
    ],
    providers: [
        FinishedTrainingsListResolver,
        PlannedTrainingsListResolver,
        TrainingResolver
    ]
})
export class TrainingsEmployeeModule {
}
