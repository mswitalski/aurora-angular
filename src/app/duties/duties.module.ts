import {NgModule} from '@angular/core';

import {DutiesAdminModule} from './admin';
import {DutiesSharedModule} from './shared';
import {DutiesUnitLeaderModule} from './unit-leader';

@NgModule({
    imports: [
        DutiesAdminModule,
        DutiesSharedModule,
        DutiesUnitLeaderModule
    ]
})
export class DutiesModule {
}
