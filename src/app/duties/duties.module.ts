import {NgModule} from '@angular/core';

import {DutiesAdminModule} from './admin/duties-admin.module';
import {DutiesSharedModule} from './shared/duties-shared.module';

@NgModule({
    imports: [
        DutiesAdminModule,
        DutiesSharedModule
    ]
})
export class DutiesModule {
}
