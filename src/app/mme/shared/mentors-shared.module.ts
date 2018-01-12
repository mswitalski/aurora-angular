import {NgModule} from '@angular/core';
import {MentorsListComponent} from './component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../msh';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        MentorsListComponent
    ],
    exports: [
        MentorsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class MentorsSharedModule {
}
