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

@NgModule({
    declarations: [
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
