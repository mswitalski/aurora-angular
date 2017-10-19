import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {AuthenticatedGuard, IsAdminGuard, IsEmployeeGuard, IsUnitLeaderGuard} from './service/guard';
import {CachedUserResolver, RolesResolver, UserResolver, UsersListResolver} from './users/resolver';
import {ErrorPageComponent} from './error-page';
import {FormErrorsComponent} from './form-errors.component';
import {moduleRouting} from './routes';
import {PaginationComponent} from './pagination.component';
import {ExpandedUsersListComponent, UserDetailsComponent} from './users';

@NgModule({
    declarations: [
        ErrorPageComponent,
        ExpandedUsersListComponent,
        FormErrorsComponent,
        PaginationComponent,
        UserDetailsComponent
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
        ExpandedUsersListComponent,
        FormErrorsComponent,
        HttpClientModule,
        PaginationComponent,
        RouterModule,
        TranslateModule,
        UserDetailsComponent
    ],
    providers: [
        AuthenticatedGuard,
        CachedUserResolver,
        IsAdminGuard,
        IsUnitLeaderGuard,
        IsEmployeeGuard,
        RolesResolver,
        UserResolver,
        UsersListResolver
    ]
})
export class SharedModule {
}
