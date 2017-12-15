import {NgModule} from '@angular/core';
import {MentorResolver, MentorsListResolver} from './resolver';
import {CommonModule} from '@angular/common';
import {moduleRouting} from './routes';
import {MentorsSharedModule} from '../shared';
import {SharedModule} from '../../shared';
import {MentorsListComponent} from './list';
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
        MentorResolver,
        MentorsListResolver
    ]
})
export class MentorsEmployeeModule {
}
