import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AuthenticatedGuard} from '../shared/service/guard';
import {EditPasswordComponent, EditProfileComponent} from './edit';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../shared';
import {UserResolver} from './user-resolver.service';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [AuthenticatedGuard],
        component: ProfileComponent,
        data: { title: 'TITLE.PROFILE' },
        path: 'profile',
        resolve: {
            user: UserResolver
        }
    },
    {
        canActivate: [AuthenticatedGuard],
        component: EditProfileComponent,
        data: { title: 'TITLE.EDIT-PROFILE' },
        path: 'profile/edit',
        resolve: {
            user: UserResolver
        }
    },
    {
        canActivate: [AuthenticatedGuard],
        component: EditPasswordComponent,
        data: { title: 'TITLE.EDIT-PASSWORD' },
        path: 'profile/edit/password',
        resolve: { // Necessary to get an ETag for update
            user: UserResolver
        }
    }
]);

@NgModule({
    declarations: [
        EditPasswordComponent,
        EditProfileComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        UserResolver
    ]
})

export class ProfileModule {
}