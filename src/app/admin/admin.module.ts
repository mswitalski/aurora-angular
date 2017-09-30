import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared';
import {UsersListComponent, UsersResolverService} from './users/list';
import {IsAdminGuard} from '../shared/service/guard/is-admin-guard.service';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsAdminGuard],
        component: UsersListComponent,
        data: { title: 'TITLE.ADMIN.USERS' },
        path: 'admin/users',
        resolve: {
            pagedResults: UsersResolverService
        }
    }
]);

@NgModule({
    declarations: [
        UsersListComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        UsersResolverService
    ]
})

export class AdminModule {
}
