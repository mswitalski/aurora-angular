import {NgModule} from '@angular/core';
import {MentorsEmployeeModule} from './employee';
import {MentorsUnitLeaderModule} from './unit-leader';
import {MentorsSharedModule} from './shared';

@NgModule({
    imports: [
        MentorsEmployeeModule,
        MentorsSharedModule,
        MentorsUnitLeaderModule
    ]
})
export class MentorsModule {}
