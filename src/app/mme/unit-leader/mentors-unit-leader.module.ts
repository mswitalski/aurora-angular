import {NgModule} from '@angular/core';
import {MentorsListComponent} from './list';
import {FeedbackResolver, MentorResolver, MentorsListResolver} from './resolver';
import {MentorsSharedModule} from '../shared';
import {CommonModule} from '@angular/common';
import {moduleRouting} from './routes';
import {SharedModule} from '../../msh';
import {MentorManagementComponent} from './mentor-management';

@NgModule({
    declarations: [
        MentorManagementComponent,
        MentorsListComponent
    ],
    imports: [
        CommonModule,
        MentorsSharedModule,
        moduleRouting,
        SharedModule
    ],
    providers: [
        FeedbackResolver,
        MentorResolver,
        MentorsListResolver
    ]
})
export class MentorsUnitLeaderModule {
}
