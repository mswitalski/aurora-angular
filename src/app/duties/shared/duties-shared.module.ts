import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {DutiesListResolver, DutyResolver} from './resolver';
import {SharedModule} from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        DutiesListResolver,
        DutyResolver
    ]
})
export class DutiesSharedModule {
}
