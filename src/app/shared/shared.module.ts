import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AuthenticatedGuard} from './service/guard/authenticated-guard.service';
import {IsAdminGuard} from './service/guard/is-admin.service';
import {IsUnitLeaderGuard} from './service/guard/is-unit-leader.service';
import {IsEmployeeGuard} from './service/guard/is-employee.service';

@NgModule({
    imports: [
        HttpClientModule ,
        RouterModule
    ],
    exports: [
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
