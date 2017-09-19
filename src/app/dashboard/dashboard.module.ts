import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AuthenticatedGuard} from '../shared/service/guard/authenticated-guard.service';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticatedGuard]
    }
]);

@NgModule({
    imports: [
        CommonModule,
        moduleRouting,
        SharedModule,
    ],
    declarations: [
        DashboardComponent
    ]
})

export class DashboardModule {
}
