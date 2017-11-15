import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {CachedDutyResolver, DutiesListResolver, DutiesPagedListResolver, DutyResolver} from './resolver';
import {DutyFormComponent} from './component';
import {SharedModule} from '../../shared';

@NgModule({
    declarations: [
        DutyFormComponent
    ],
    exports: [
        DutyFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        CachedDutyResolver,
        DutiesListResolver,
        DutiesPagedListResolver,
        DutyResolver
    ]
})
export class DutiesSharedModule {
}
