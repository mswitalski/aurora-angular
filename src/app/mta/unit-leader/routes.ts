import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TasksListComponent} from './list';
import {DoneTasksListResolver, TasksStatisticsResolver, UndoneTasksListResolver} from './resolver';
import {IsUnitLeaderGuard} from '../../msh/service/guard';
import {CachedUserResolver} from '../../mus/shared/resolver';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: TasksListComponent,
        data: {title: 'TITLE.UNIT-LEADER.USER-TASKS'},
        path: 'unitleader/users/:userId/tasks',
        resolve: {
            user: CachedUserResolver,
            undoneTasks: UndoneTasksListResolver,
            donePagedResults: DoneTasksListResolver,
            statistics: TasksStatisticsResolver
        }
    }
]);
