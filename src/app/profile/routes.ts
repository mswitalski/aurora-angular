import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AuthenticatedGuard} from '../shared/service/guard';
import {EditPasswordComponent, EditProfileComponent} from './edit';
import {LoggedUserResolver} from './logged-user-resolver.service';
import {ProfileComponent} from './profile.component';

export const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [AuthenticatedGuard],
        component: ProfileComponent,
        data: {title: 'TITLE.PROFILE'},
        path: 'profile',
        resolve: {
            user: LoggedUserResolver
        }
    },
    {
        canActivate: [AuthenticatedGuard],
        component: EditProfileComponent,
        data: {title: 'TITLE.EDIT-PROFILE'},
        path: 'profile/edit',
        resolve: {
            user: LoggedUserResolver
        }
    },
    {
        canActivate: [AuthenticatedGuard],
        component: EditPasswordComponent,
        data: {title: 'TITLE.EDIT-PASSWORD'},
        path: 'profile/edit/password',
        resolve: { // Necessary to get an ETag for update
            user: LoggedUserResolver
        }
    }
]);
