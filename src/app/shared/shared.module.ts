import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {AuthenticatedGuard, IsAdminGuard, IsEmployeeGuard, IsUnitLeaderGuard} from './service/guard';
import {CachedUserResolver, UsersListResolver, UserResolver, RolesResolver} from './users/resolver';
import {ErrorPageComponent} from './error-page';
import {FormErrorsComponent} from './form-errors.component';
import {moduleRouting} from './routes';
import {PaginationComponent} from './pagination.component';
import {UserDetailsComponent} from './users';

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
        IsEmployeeGuard,
        CachedUserResolver,
        RolesResolver,
        UsersListResolver,
        UserResolver
    ]
})
export class SharedModule {
}
