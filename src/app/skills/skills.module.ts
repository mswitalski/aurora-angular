import {NgModule} from '@angular/core';
import {SkillsUnitLeaderModule} from './unit-leader';
import {SkillsSharedModule} from './shared';

@NgModule({
    imports: [
        SkillsSharedModule,
        SkillsUnitLeaderModule
    ]
})
export class SkillsModule {
}
