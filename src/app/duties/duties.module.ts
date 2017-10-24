import {NgModule} from '@angular/core';

import {DutiesSharedModule} from './shared';
import {DutiesUnitLeaderModule} from './unit-leader';

@NgModule({
    imports: [
        DutiesSharedModule,
        DutiesUnitLeaderModule
    ]
})
export class DutiesModule {
}
