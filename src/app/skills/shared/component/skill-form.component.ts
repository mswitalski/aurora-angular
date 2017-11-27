import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {AutoUnsubscriberComponent} from '../../../shared';
import {Skill, ValidationError} from '../../../shared/model';
import {validationConstraints} from '../../../shared/configuration';

@Component({
    selector: 'app-skill-form',
    templateUrl: './skill-form.component.html'
})
export class SkillFormComponent extends AutoUnsubscriberComponent implements OnInit {

    skillForm: FormGroup;
    isEditAction = false;
    isSubmitting = false;
    serverResponse: Observable<HttpErrorResponse>;
    skill = new Skill();
    validation = validationConstraints.skill;
    validationErrors: ValidationError[] = [];

    @Input() set editedSkill(value: Skill) {
        this.skill = value;
        this.isEditAction = true;
    }

    @Input() set response(value: Observable<HttpErrorResponse>) {
        this.serverResponse = value;
    }

    @Output()
    formSubmitted: EventEmitter<Skill> = new EventEmitter();

    constructor(private formBuilder: FormBuilder, private location: Location) {
        super();
    }

    ngOnInit(): void {
        this.createFormControls();
    }

    private createFormControls(): void {
        this.skillForm = this.formBuilder.group({
            'name': ['', [
                Validators.required,
                Validators.maxLength(this.validation.name.max)]
            ]
        });
    }

    goBack(): void {
        this.location.back();
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.formSubmitted.emit(this.skill);
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
