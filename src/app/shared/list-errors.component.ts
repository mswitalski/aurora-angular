import {Component, Input} from '@angular/core';
import {ValidationError} from './model/validation-error.model';

@Component({
    selector: 'app-list-errors',
    templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {

    private errorList: ValidationError[];

    @Input() set errors(errorList: ValidationError[]) {
        this.errorList = errorList;
        console.log(this.errors);
    }

    get errors(): ValidationError[] {
        return this.errorList;
    }
}
