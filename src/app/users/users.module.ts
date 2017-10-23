import {NgModule} from '@angular/core';
import {UsersAdminModule} from './admin';
import {UsersUnitLeaderModule} from './unit-leader';
import {UsersSharedModule} from './shared';

@NgModule({
    imports: [
        UsersAdminModule,
        UsersSharedModule,
        UsersUnitLeaderModule
    ]
})
export class UsersModule {
}
