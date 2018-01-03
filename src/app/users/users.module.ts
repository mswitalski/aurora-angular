import {NgModule} from '@angular/core';
import {UsersAdminModule} from './admin';
import {UsersUnitLeaderModule} from './unit-leader';
import {UsersSharedModule} from './shared';
import {UsersCommonModule} from './common';

@NgModule({
    imports: [
        UsersAdminModule,
        UsersCommonModule,
        UsersSharedModule,
        UsersUnitLeaderModule
    ]
})
export class UsersModule {
}
