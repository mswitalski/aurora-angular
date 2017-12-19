import {NgModule} from '@angular/core';
import {TrainingsListComponent} from './component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        TrainingsListComponent
    ],
    exports: [
        TrainingsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class TrainingsSharedModule {
}
