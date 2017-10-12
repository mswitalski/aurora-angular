import {Component, Input} from '@angular/core';
import {ValidationError} from './model/validation-error.model';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'app-form-errors',
    templateUrl: './form-errors.component.html'
})

export class FormErrorsComponent {

    serverErrorList: ValidationError[] = [];
    fieldName: string;
    control: AbstractControl;
    minLen = 0;
    maxLen = 0;

    @Input() set serverErrors(errorList: ValidationError[]) {
        this.serverErrorList = errorList.filter(e => e.fieldName === this.fieldName);
    }

    @Input() set controlName(name: string) {
        this.fieldName = name;
    }

    @Input() set formControl(control: AbstractControl) {
        this.control = control;
    }

    @Input() set minLength(value: number) {
        this.minLen = value;
    }

    @Input() set maxLength(value: number) {
        this.maxLen = value;
    }
}
