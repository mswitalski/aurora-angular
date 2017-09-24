import {ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AuthenticatedGuard} from '../shared/service/guard';
import {EditProfileComponent} from './edit';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../shared';
import {UserResolver} from './user-resolver.service';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        canActivate: [AuthenticatedGuard],
        component: ProfileComponent,
        path: 'profile',
        resolve: {
            user: UserResolver
        }
    },
    {
        canActivate: [AuthenticatedGuard],
        component: EditProfileComponent,
        path: 'profile/edit',
        resolve: {
            user: UserResolver
        }
    }
]);

@NgModule({
    declarations: [
        EditProfileComponent,
        ProfileComponent
    ],
    imports: [
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
