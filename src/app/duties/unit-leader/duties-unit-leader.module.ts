import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {DutiesSharedModule} from '../shared';
import {SharedModule} from '../../shared';
import {moduleRouting} from './routes';
import {DutiesListComponent} from './list';

@NgModule({
    declarations: [
        DutiesListComponent
    ],
    imports: [
        CommonModule,
        DutiesSharedModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class DutiesUnitLeaderModule {
}
