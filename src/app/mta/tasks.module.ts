import {NgModule} from '@angular/core';
import {TasksSharedModule} from './shared';
import {TasksEmployeeModule} from './employee';
import {TasksUnitLeaderModule} from './unit-leader';

@NgModule({
    imports: [
        TasksEmployeeModule,
        TasksSharedModule,
        TasksUnitLeaderModule
    ]
})
export class TasksModule {
}
