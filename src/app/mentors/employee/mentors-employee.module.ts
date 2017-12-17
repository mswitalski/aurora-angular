import {NgModule} from '@angular/core';
import {FeedbackResolver, MentorResolver, MentorsListResolver, MyMentorsListResolver} from './resolver';
import {CommonModule} from '@angular/common';
import {moduleRouting} from './routes';
import {MentorsSharedModule} from '../shared';
import {SharedModule} from '../../shared';
import {MentorsListComponent} from './list';
import {CreateMentorComponent, MentorManagementComponent} from './mentor-management';
import {CreateFeedbackComponent} from './feedback';
import {SkillsEmployeeModule} from '../../skills/employee';

@NgModule({
    declarations: [
        CreateFeedbackComponent,
        CreateMentorComponent,
        MentorManagementComponent,
        MentorsListComponent
    ],
    imports: [
        CommonModule,
        MentorsSharedModule,
        moduleRouting,
        SharedModule,
        SkillsEmployeeModule
    ],
    providers: [
        FeedbackResolver,
        MentorResolver,
        MentorsListResolver,
        MyMentorsListResolver
    ]
})
export class MentorsEmployeeModule {
}
