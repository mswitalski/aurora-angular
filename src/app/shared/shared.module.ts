import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AuthenticatedGuard} from './service/guard/authenticated-guard.service';
import {IsAdminGuard} from './service/guard/is-admin-guard.service';
import {IsUnitLeaderGuard} from './service/guard/is-unit-leader-guard.service';
import {IsEmployeeGuard} from './service/guard/is-employee-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ListErrorsComponent} from './list-errors.component';
import {CommonModule} from '@angular/common';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'error/:code',
        component: ErrorPageComponent,
        canActivate: [AuthenticatedGuard]
    }
]);

@NgModule({
    declarations: [
        ErrorPageComponent,
        ListErrorsComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        moduleRouting,
        RouterModule
    ],
    exports: [
        ListErrorsComponent,
        HttpClientModule ,
        RouterModule
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
