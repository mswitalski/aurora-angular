import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {AuthenticatedGuard} from './service/guard/authenticated-guard.service';
import {ErrorPageComponent} from './error-page';
import {IsAdminGuard} from './service/guard/is-admin-guard.service';
import {IsUnitLeaderGuard} from './service/guard/is-unit-leader-guard.service';
import {IsEmployeeGuard} from './service/guard/is-employee-guard.service';
import {PaginationComponent} from './pagination.component';
import {UserDetailsComponent} from './users/user-details.component';
import {FormErrorsComponent} from './form-errors.component';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [AuthenticatedGuard],
        component: ErrorPageComponent,
        data: { title: 'TITLE.ERROR' },
        path: 'error/:code'
    }
]);

@NgModule({
    declarations: [
        ErrorPageComponent,
        FormErrorsComponent,
        PaginationComponent,
        UserDetailsComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        moduleRouting,
        RouterModule,
        TranslateModule.forChild()
    ],
    exports: [
        FormErrorsComponent,
        HttpClientModule,
        PaginationComponent,
        RouterModule,
        TranslateModule,
        UserDetailsComponent
    ],
    providers: [
        AuthenticatedGuard,
        IsAdminGuard,
        IsUnitLeaderGuard,
        IsEmployeeGuard
    ]
})

export class SharedModule {
}
