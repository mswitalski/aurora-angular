import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared';
import {CommonModule} from '@angular/common';
import {DoneTasksListComponent, TasksStatisticsComponent, UndoneTasksListComponent} from './component';

@NgModule({
    declarations: [
        DoneTasksListComponent,
        TasksStatisticsComponent,
        UndoneTasksListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        DoneTasksListComponent,
        TasksStatisticsComponent,
        UndoneTasksListComponent
    ]
})
export class TasksSharedModule {
}
