import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TasksListComponent} from './list';
import {
    CachedTaskResolver, DoneTasksListResolver, TaskResolver, TasksStatisticsResolver,
    UndoneTasksListResolver
} from './resolver';
import {IsEmployeeGuard} from '../../msh/service/guard';
import {CreateTaskComponent, TaskManagementComponent} from './task-management';
import {EditTaskComponent} from './task-management/edit';

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
    },
    {
        canActivate: [IsEmployeeGuard],
        component: TaskManagementComponent,
        data: {title: 'TITLE.EMPLOYEE.TASK-DETAILS'},
        path: 'employee/tasks/:taskId',
        resolve: {
            task: TaskResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: CreateTaskComponent,
        data: {title: 'TITLE.EMPLOYEE.TASK-CREATE'},
        path: 'employee/tasks/create/task'
    },
    {
        canActivate: [IsEmployeeGuard],
        component: EditTaskComponent,
        data: {title: 'TITLE.EMPLOYEE.TASK-EDIT'},
        path: 'employee/tasks/:taskId/edit',
        resolve: {
            task: CachedTaskResolver
        }
    }
]);
