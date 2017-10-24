import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {CreateDutyComponent, DutyManagementComponent} from './management';
import {DutiesListComponent} from './list';
import {DutiesSharedModule} from '../shared';
import {SharedModule} from '../../shared';
import {moduleRouting} from './routes';
import {UsersSharedModule} from '../../users/shared';

@NgModule({
    declarations: [
        CreateDutyComponent,
        DutiesListComponent,
        DutyManagementComponent
    ],
    imports: [
        CommonModule,
        DutiesSharedModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule,
        UsersSharedModule
    ]
})
export class DutiesUnitLeaderModule {
}
