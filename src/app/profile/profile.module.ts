import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {AuthenticatedGuard} from '../shared/service/guard/authenticated-guard.service';
import {SharedModule} from '../shared/shared.module';
import {UserResolver} from './user-resolver.service';
import {EditProfileComponent} from './edit/edit-profile.component';
import {ReactiveFormsModule} from '@angular/forms';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthenticatedGuard],
        resolve: {
            user: UserResolver
        }
    },
    {
        path: 'profile/edit',
        component: EditProfileComponent,
        canActivate: [AuthenticatedGuard],
        resolve: {
            user: UserResolver
        }
    }
]);

@NgModule({
    imports: [
        moduleRouting,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        ProfileComponent,
        EditProfileComponent
    ],
    providers: [
        UserResolver
    ]
})
export class ProfileModule {
}
