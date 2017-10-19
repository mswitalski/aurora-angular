import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {moduleRouting} from './routes';
import {UsersListComponent} from './users/list';
import {SharedModule} from '../shared';

@NgModule({
    declarations: [
        UsersListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class UnitLeaderModule {
}
