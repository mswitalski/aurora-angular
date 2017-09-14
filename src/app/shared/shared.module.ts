import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        HttpModule,
        RouterModule
    ],
    exports: [
        HttpModule,
        RouterModule
    ]
})

export class SharedModule {
}
