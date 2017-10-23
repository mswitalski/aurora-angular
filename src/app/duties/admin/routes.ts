import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {IsAdminGuard} from '../../shared/service/guard';
import {DutiesListComponent} from './list';
import {DutiesListResolver} from '../shared/resolver';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [IsAdminGuard],
        component: DutiesListComponent,
        data: { title: 'TITLE.ADMIN.DUTIES' },
        path: 'admin/duties',
        resolve: {
            pagedResults: DutiesListResolver
        }
    },
]);
