import {NgModule} from '@angular/core';
import {TrainingsSharedModule} from '../shared';
import {CachedTrainingResolver, TrainingResolver, TrainingsListResolver} from './resolver';

@NgModule({
    imports: [
        TrainingsSharedModule,
    ],
    providers: [
        CachedTrainingResolver,
        TrainingResolver,
        TrainingsListResolver
    ]
})
export class TrainingsUnitLeaderModule {
}
