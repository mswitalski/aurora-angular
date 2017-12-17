import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IsEmployeeGuard} from '../../shared/service/guard';
import {FeedbackResolver, MentorResolver, MentorsListResolver, MyMentorsListResolver} from './resolver';
import {MentorsListComponent} from './list';
import {CreateMentorComponent, MentorManagementComponent} from './mentor-management';
import {EvaluationsListResolver} from '../../skills/employee/resolver';
import {CreateFeedbackComponent} from './feedback';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsEmployeeGuard],
        component: MentorsListComponent,
        data: { title: 'TITLE.EMPLOYEE.MENTORS' },
        path: 'employee/mentors',
        resolve: {
            pagedResults: MentorsListResolver,
            myMentors: MyMentorsListResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: MentorManagementComponent,
        data: { title: 'TITLE.EMPLOYEE.MENTOR-DETAILS' },
        path: 'employee/mentors/:mentorId',
        resolve: {
            mentor: MentorResolver,
            feedback: FeedbackResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: CreateMentorComponent,
        data: { title: 'TITLE.EMPLOYEE.MENTOR-ADD' },
        path: 'employee/mentors/add/mentor',
        resolve: {
            evaluations: EvaluationsListResolver,
            myMentors: MyMentorsListResolver
        }
    },
    {
        canActivate: [IsEmployeeGuard],
        component: CreateFeedbackComponent,
        data: { title: 'TITLE.EMPLOYEE.FEEDBACK-ADD' },
        path: 'employee/mentors/:mentorId/add/feedback',
        resolve: {
            mentor: MentorResolver
        }
    }
]);
