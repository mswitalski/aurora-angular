import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {
    ApiService, AuthService, DutiesService, EvaluationsService, FeedbackService, JwtService, MentorsService,
    RolesService, SkillsService, TrainingsService,
    UsersService
} from './service';
import {AuthenticatedGuard, IsAdminGuard, IsEmployeeGuard, IsUnitLeaderGuard} from './service/guard';
import {ErrorPageComponent} from './error-page';
import {FormErrorsComponent} from './form-errors.component';
import {moduleRouting} from './routes';
import {PaginationComponent} from './pagination.component';
import {ShowAdminDirective} from './show-admin.directive';
import {ShowUnitLeaderDirective} from './show-unit-leader.directive';
import {ShowEmployeeDirective} from './show-employee.directive';

@NgModule({
    declarations: [
        ErrorPageComponent,
        FormErrorsComponent,
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
        TranslateModule.forChild()
    ],
    exports: [
        FormErrorsComponent,
        HttpClientModule,
        PaginationComponent,
        RouterModule,
        TranslateModule,
        ShowAdminDirective,
        ShowEmployeeDirective,
        ShowUnitLeaderDirective
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
        AuthenticatedGuard,
        IsAdminGuard,
        IsUnitLeaderGuard,
        IsEmployeeGuard
    ]
})
export class SharedModule {
}
