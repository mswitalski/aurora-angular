import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared';
import {SkillsListComponent} from './component';
import {SkillResolver, SkillsListResolver} from './resolver';

@NgModule({
    declarations: [
        SkillsListComponent
    ],
    exports: [
        SkillsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        SkillResolver,
        SkillsListResolver
    ]
})
export class SkillsSharedModule {
}
