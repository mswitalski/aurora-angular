import {NgModule} from '@angular/core';
import {FeedbackResolver, MentorResolver, MentorsListResolver, MyMentorsListResolver} from './resolver';
import {CommonModule} from '@angular/common';
import {moduleRouting} from './routes';
import {MentorsSharedModule} from '../shared';
import {SharedModule} from '../../msh';
import {MentorsListComponent} from './list';
import {CreateMentorComponent, MentorManagementComponent} from './mentor-management';
import {CreateFeedbackComponent} from './feedback';
import {SkillsEmployeeModule} from '../../msk/employee';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        CreateFeedbackComponent,
        CreateMentorComponent,
        MentorManagementComponent,
        MentorsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
