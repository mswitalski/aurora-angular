import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {AuthenticatedGuard} from '../shared/service/guard/authenticated-guard.service';
import {SharedModule} from '../shared/shared.module';
import {UserResolver} from './user-resolver.service';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthenticatedGuard],
        resolve: {
            user: UserResolver
        }
    }
]);

@NgModule({
    imports: [
        moduleRouting,
        SharedModule
    ],
    declarations: [
        ProfileComponent
    ],
    providers: [
        UserResolver
    ]
})
export class ProfileModule {
}
