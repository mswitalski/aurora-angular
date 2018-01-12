import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TasksListComponent} from './list';
import {DoneTasksListResolver, TasksStatisticsResolver, UndoneTasksListResolver} from './resolver';
import {IsUnitLeaderGuard} from '../../msh/service/guard';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: TasksListComponent,
        data: {title: 'TITLE.UNIT-LEADER.USER-TASKS'},
        path: 'unitleader/users/:userId/tasks',
        resolve: {
            undoneTasks: UndoneTasksListResolver,
            donePagedResults: DoneTasksListResolver,
            statistics: TasksStatisticsResolver
        }
    }
]);
