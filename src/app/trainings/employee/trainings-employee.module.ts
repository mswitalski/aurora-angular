import {NgModule} from '@angular/core';
import {TrainingsSharedModule} from '../shared';
import {FinishedTrainingsListResolver, PlannedTrainingsListResolver, TrainingResolver} from './resolver';
import {TrainingsListComponent} from './list';
import {moduleRouting} from './routes';
import {SharedModule} from '../../shared';

@NgModule({
    declarations: [
        TrainingsListComponent
    ],
    imports: [
        TrainingsSharedModule,
        moduleRouting,
        SharedModule,
    ],
    providers: [
        FinishedTrainingsListResolver,
        PlannedTrainingsListResolver,
        TrainingResolver
    ]
})
export class TrainingsEmployeeModule {
}
