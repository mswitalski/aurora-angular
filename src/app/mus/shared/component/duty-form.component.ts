import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Duty, ValidationError} from '../../../msh/model';
import {validationConstraints} from '../../../msh/configuration';

@Component({
    selector: 'app-duty-form',
    templateUrl: './duty-form.component.html'
})
export class DutyFormComponent {

    duty = new Duty();
    dutyForm: FormGroup;
    isSubmitting = false;
    serverResponse: Observable<HttpErrorResponse>;
    validation = validationConstraints.duty;
    validationErrors: ValidationError[] = [];

    @Input()
    set editedDuty(value: Duty) {
        this.duty = value;
    }

    @Input()
    set response(value: Observable<HttpErrorResponse>) {
        this.serverResponse = value;
    }

    @Output()
    formSubmitted: EventEmitter<Duty> = new EventEmitter();

    constructor(private formBuilder: FormBuilder, private location: Location) {
        this.dutyForm = this.formBuilder.group({
            'name': [
                '', [
                    Validators.required,
                    Validators.maxLength(this.validation.name.max)
                ]
            ]
        });
    }

    goBack(): void {
        this.location.back();
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.formSubmitted.emit(this.duty);
        this.serverResponse.subscribe(
            (error) => {
                if (error.status === 400) {
                    this.validationErrors = error.error;
                }

                this.isSubmitting = false;
            }
        );
    }
}
