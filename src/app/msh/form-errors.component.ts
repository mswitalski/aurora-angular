import {Component, Input} from '@angular/core';
import {ValidationError} from './model';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'app-form-errors',
    templateUrl: './form-errors.component.html'
})
export class FormErrorsComponent {

    control: AbstractControl;
    fieldName: string;
    maxLen = 0;
    min = 0;
    minLen = 0;
    patternMsg: string;
    serverErrorList: ValidationError[] = [];

    @Input() set serverErrors(errorList: ValidationError[]) {
        if (errorList) {
            this.serverErrorList = errorList.filter(e => e.fieldName === this.fieldName);

        } else {
            this.serverErrorList = errorList;
        }
    }

    @Input() set controlName(name: string) {
        this.fieldName = name;
    }

    @Input() set formControl(control: AbstractControl) {
        this.control = control;
    }

    @Input() set minNumber(value: number) {
        this.min = value;
    }

    @Input() set minLength(value: number) {
        this.minLen = value;
    }

    @Input() set maxLength(value: number) {
        this.maxLen = value;
    }

    @Input() set patternMessage(value: string) {
        this.patternMsg = value;
    }
}
