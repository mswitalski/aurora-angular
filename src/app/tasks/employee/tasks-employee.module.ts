import {NgModule} from '@angular/core';
import {
    CachedTaskResolver, DoneTasksListResolver, TaskResolver, TasksStatisticsResolver,
    UndoneTasksListResolver
} from './resolver';
import {TasksSharedModule} from '../shared';
import {moduleRouting} from './routes';
import {TasksListComponent} from './list';
import {SharedModule} from '../../shared';
import {CommonModule} from '@angular/common';
import {CreateTaskComponent, TaskManagementComponent} from './task-management';
import {EditTaskComponent} from './task-management/edit';

@NgModule({
    declarations: [
        CreateTaskComponent,
        EditTaskComponent,
        TaskManagementComponent,
        TasksListComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        SharedModule,
        TasksSharedModule
    ],
    providers: [
        CachedTaskResolver,
        DoneTasksListResolver,
        TaskResolver,
        TasksStatisticsResolver,
        UndoneTasksListResolver
    ]
})
export class TasksEmployeeModule {
}
