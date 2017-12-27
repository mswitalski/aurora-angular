import {NgModule} from '@angular/core';
import {DoneTasksListResolver, TasksStatisticsResolver, UndoneTasksListResolver} from './resolver';

@NgModule({
    providers: [
        DoneTasksListResolver,
        TasksStatisticsResolver,
        UndoneTasksListResolver
    ]
})
export class TasksUnitLeaderModule {
}
