import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {DutiesListComponent} from './list';
import {SharedModule} from '../../shared';
import {DutiesSharedModule} from '../shared';
import {moduleRouting} from './routes';

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
export class DutiesAdminModule {
}
