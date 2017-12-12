import {NgModule} from '@angular/core';
import {SkillsUnitLeaderModule} from './unit-leader';
import {SkillsSharedModule} from './shared';
import {SkillsEmployeeModule} from './employee';

@NgModule({
    imports: [
        SkillsEmployeeModule,
        SkillsSharedModule,
        SkillsUnitLeaderModule
    ]
})
export class SkillsModule {
}
