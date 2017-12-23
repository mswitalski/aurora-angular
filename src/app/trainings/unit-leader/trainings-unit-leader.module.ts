import {NgModule} from '@angular/core';
import {TrainingsSharedModule} from '../shared';
import {CachedTrainingResolver, TrainingResolver, TrainingsListResolver} from './resolver';
import {TrainingsListComponent} from './list';
import {moduleRouting} from './routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared';
import {CreateTrainingComponent, TrainingManagementComponent} from './training-management';
import {EditTrainingComponent, EditUsersComponent} from './training-management/edit';
import {UsersSharedModule} from '../../users/shared';

@NgModule({
    declarations: [
        CreateTrainingComponent,
        EditTrainingComponent,
        EditUsersComponent,
        TrainingManagementComponent,
        TrainingsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule,
        TrainingsSharedModule,
        UsersSharedModule
    ],
    providers: [
        CachedTrainingResolver,
        TrainingResolver,
        TrainingsListResolver
    ]
})
export class TrainingsUnitLeaderModule {
}
