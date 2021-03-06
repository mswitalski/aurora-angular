import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Training, ValidationError} from '../../../msh/model';
import {validationConstraints} from '../../../msh/configuration';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {OutlookService} from '../../../msh/service';
import {DatesUtil} from '../../../msh/util';

@Component({
    selector: 'app-training-form',
    templateUrl: './training-form.component.html'
})
export class TrainingFormComponent {

    endDate: Date;
    isOutlookLogged: boolean;
    isSubmitting = false;
    serverResponse: Observable<HttpErrorResponse>;
    startDate: Date;
    todayDate = new Date();
    training = new Training();
    trainingForm: FormGroup;
    validation = validationConstraints.training;
    validationErrors: ValidationError[] = [];

    @Input() set editedTraining(value: Training) {
        this.training = value;
        this.startDate = new Date(this.training.startDateTime);
        this.endDate = new Date(this.training.endDateTime);
    }

    @Input() set response(value: Observable<HttpErrorResponse>) {
        this.serverResponse = value;
    }

    @Output()
    formSubmitted: EventEmitter<Training> = new EventEmitter();

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private location: Location,
                private outlookService: OutlookService) {
        this.outlookService.isTokenPresent.subscribe(v => this.isOutlookLogged = v);
        this.createFormControls();
    }

    private createFormControls(): void {
        this.trainingForm = this.formBuilder.group({
            'name': [
                '', [
                    Validators.required,
                    Validators.maxLength(this.validation.name.max)
                ]
            ],
            'type': [
                '', [
                    Validators.required,
                    Validators.maxLength(this.validation.type.max)
                ]
            ],
            'location': [
                '', [
                    Validators.required,
                    Validators.maxLength(this.validation.location.max)
                ]
            ],
            'description': [
                '', [
                    Validators.required,
                    Validators.maxLength(this.validation.description.max)
                ]
            ],
            'participantsLimit': [
                '', [
                    Validators.required,
                    Validators.min(this.validation.participantsLimit.min)
                ]
            ],
            'internal': new FormControl(this.training.internal.toString()),
            'startDateTime': '',
            'endDateTime': ''
        });
    }

    submitForm(): void {
        this.training.startDateTime = DatesUtil.formatDateTime(this.startDate);
        this.training.endDateTime = DatesUtil.formatDateTime(this.endDate);
        this.training.internal = this.trainingForm.get('internal').value;
        this.isSubmitting = true;
        this.formSubmitted.emit(this.training);
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
