import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IsUnitLeaderGuard} from '../../shared/service/guard';
import {MentorsListComponent} from './list';
import {FeedbackResolver, MentorResolver, MentorsListResolver} from './resolver';
import {MentorManagementComponent} from './mentor-management';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsUnitLeaderGuard],
        component: MentorsListComponent,
        data: { title: 'TITLE.UNIT-LEADER.MENTORS' },
        path: 'unitleader/mentors',
        resolve: {
            pagedResults: MentorsListResolver
        }
    },
    {
        canActivate: [IsUnitLeaderGuard],
        component: MentorManagementComponent,
        data: { title: 'TITLE.UNIT-LEADER.MENTOR-DETAILS' },
        path: 'unitleader/mentors/:mentorId',
        resolve: {
            mentor: MentorResolver,
            feedback: FeedbackResolver
        }
    }
]);
