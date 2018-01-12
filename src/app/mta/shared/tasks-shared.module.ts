import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../msh';
import {CommonModule} from '@angular/common';
import {
    DoneTasksListComponent, TaskFormComponent, TasksStatisticsComponent,
    UndoneTasksListComponent
} from './component';

@NgModule({
    declarations: [
        DoneTasksListComponent,
        TaskFormComponent,
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
        TaskFormComponent,
        TasksStatisticsComponent,
        UndoneTasksListComponent
    ]
})
export class TasksSharedModule {
}
