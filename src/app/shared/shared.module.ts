import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {
    ApiService, AuthService, DutiesService, EvaluationsService, FeedbackService, JwtService, MentorsService,
    OutlookService,
    RolesService, SkillsService, TasksService, TrainingsService, UsersService
} from './service';
import {AuthenticatedGuard, IsAdminGuard, IsEmployeeGuard, IsUnitLeaderGuard} from './service/guard';
import {ErrorPageComponent} from './error-page';
import {FormErrorsComponent} from './form-errors.component';
import {moduleRouting} from './routes';
import {PaginationComponent} from './pagination.component';
import {ShowAdminDirective} from './show-admin.directive';
import {ShowUnitLeaderDirective} from './show-unit-leader.directive';
import {ShowEmployeeDirective} from './show-employee.directive';
import {DateTimePickerModule} from 'ng-pick-datetime';
import {FormLegendComponent} from './form-legend.component';

@NgModule({
    declarations: [
        ErrorPageComponent,
        FormErrorsComponent,
        FormLegendComponent,
        PaginationComponent,
        ShowAdminDirective,
        ShowEmployeeDirective,
        ShowUnitLeaderDirective
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule.forChild(),
        DateTimePickerModule
    ],
    exports: [
        FormErrorsComponent,
        FormLegendComponent,
        HttpClientModule,
        PaginationComponent,
        RouterModule,
        TranslateModule,
        ShowAdminDirective,
        ShowEmployeeDirective,
        ShowUnitLeaderDirective,
        DateTimePickerModule
    ],
    providers: [
        ApiService,
        AuthService,
        DutiesService,
        EvaluationsService,
        FeedbackService,
        JwtService,
        MentorsService,
        RolesService,
        SkillsService,
        TrainingsService,
        UsersService,
        TasksService,
        OutlookService,
        AuthenticatedGuard,
        IsAdminGuard,
        IsUnitLeaderGuard,
        IsEmployeeGuard
    ]
})
export class SharedModule {
}
