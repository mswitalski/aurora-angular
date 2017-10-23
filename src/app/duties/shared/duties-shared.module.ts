import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {DutiesBasicListComponent} from './component';
import {DutiesListResolver} from './resolver';
import {SharedModule} from '../../shared';

@NgModule({
    declarations: [
        DutiesBasicListComponent
    ],
    exports: [
        DutiesBasicListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        DutiesListResolver
    ]
})
export class DutiesSharedModule {
}
