import {NgModule} from '@angular/core';
import {DoneTasksListResolver, TasksStatisticsResolver, UndoneTasksListResolver} from './resolver';
import {TasksListComponent} from './list';
import {moduleRouting} from './routes';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../msh';
import {TasksSharedModule} from '../shared';
import {UsersSharedModule} from '../../mus/shared';

@NgModule({
    declarations: [
        TasksListComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        SharedModule,
        TasksSharedModule,
        UsersSharedModule
    ],
    providers: [
        DoneTasksListResolver,
        TasksStatisticsResolver,
        UndoneTasksListResolver
    ]
})
export class TasksUnitLeaderModule {
}
