import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TasksListComponent} from './list';
import {DoneTasksListResolver, TasksStatisticsResolver, UndoneTasksListResolver} from './resolver';
import {IsEmployeeGuard} from '../../shared/service/guard';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsEmployeeGuard],
        component: TasksListComponent,
        data: {title: 'TITLE.EMPLOYEE.MY-TASKS'},
        path: 'employee/tasks',
        resolve: {
            undoneTasks: UndoneTasksListResolver,
            donePagedResults: DoneTasksListResolver,
            statistics: TasksStatisticsResolver
        }
    }
]);
