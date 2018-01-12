import {NgModule} from '@angular/core';
import {TrainingsEmployeeModule} from './employee';
import {TrainingsUnitLeaderModule} from './unit-leader';
import {TrainingsSharedModule} from './shared';

@NgModule({
    imports: [
        TrainingsEmployeeModule,
        TrainingsSharedModule,
        TrainingsUnitLeaderModule
    ]
})
export class TrainingsModule {
}
