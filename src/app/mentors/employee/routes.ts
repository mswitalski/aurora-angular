import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IsEmployeeGuard} from '../../shared/service/guard';
import {MentorResolver, MentorsListResolver} from './resolver';
import {MentorsListComponent} from './list';
import {MentorManagementComponent} from './mentor-management';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsEmployeeGuard],
        component: MentorsListComponent,
        data: { title: 'TITLE.EMPLOYEE.MENTORS' },
        path: 'employee/mentors',
        resolve: {
            pagedResults: MentorsListResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: MentorManagementComponent,
        data: { title: 'TITLE.EMPLOYEE.MENTOR-DETAILS' },
        path: 'employee/mentors/:mentorId',
        resolve: {
            mentor: MentorResolver
        }
    }
]);
