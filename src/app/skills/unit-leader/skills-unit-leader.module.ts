import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../../shared';
import {moduleRouting} from './routes';
import {SkillsListComponent} from './list';
import {SkillsSharedModule} from '../shared';
import {SkillManagementComponent} from './skill-management';

@NgModule({
    declarations: [
        SkillsListComponent,
        SkillManagementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        moduleRouting,
        ReactiveFormsModule,
        SharedModule,
        SkillsSharedModule
    ]
})
export class SkillsUnitLeaderModule {
}
