import {NgModule} from '@angular/core';
import {TrainingDetailsComponent, TrainingsListComponent} from './component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared';
import {CommonModule} from '@angular/common';
import {UsersSharedModule} from '../../users/shared';

@NgModule({
    declarations: [
        TrainingDetailsComponent,
        TrainingsListComponent
    ],
    exports: [
        TrainingDetailsComponent,
        TrainingsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        UsersSharedModule
    ]
})
export class TrainingsSharedModule {
}
