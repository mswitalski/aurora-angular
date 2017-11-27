import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared';
import {SkillFormComponent, SkillsListComponent} from './component';
import {CachedSkillResolver, SkillResolver, SkillsListResolver} from './resolver';

@NgModule({
    declarations: [
        SkillFormComponent,
        SkillsListComponent
    ],
    exports: [
        SkillFormComponent,
        SkillsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        CachedSkillResolver,
        SkillResolver,
        SkillsListResolver
    ]
})
export class SkillsSharedModule {
}
