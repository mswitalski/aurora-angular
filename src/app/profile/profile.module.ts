import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {AuthenticatedGuard} from '../shared/service/guard/authenticated-guard.service';
import {SharedModule} from '../shared/shared.module';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthenticatedGuard]
    }
]);

@NgModule({
    imports: [
        moduleRouting,
        SharedModule
    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule {
}
