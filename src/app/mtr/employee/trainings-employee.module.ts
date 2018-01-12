import {NgModule} from '@angular/core';
import {TrainingsSharedModule} from '../shared';
import {FinishedTrainingsListResolver, PlannedTrainingsListResolver, TrainingResolver} from './resolver';
import {TrainingsListComponent} from './list';
import {moduleRouting} from './routes';
import {SharedModule} from '../../msh';
import {TrainingManagementComponent} from './training-management';

@NgModule({
    declarations: [
        TrainingManagementComponent,
        TrainingsListComponent
    ],
    imports: [
        moduleRouting,
        SharedModule,
        TrainingsSharedModule
    ],
    providers: [
        FinishedTrainingsListResolver,
        PlannedTrainingsListResolver,
        TrainingResolver
    ]
})
export class TrainingsEmployeeModule {
}
