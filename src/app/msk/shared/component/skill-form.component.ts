import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Skill, ValidationError} from '../../../msh/model';
import {validationConstraints} from '../../../msh/configuration';

@Component({
    selector: 'app-skill-form',
    templateUrl: './skill-form.component.html'
})
export class SkillFormComponent {

    isEditAction = false;
    isSubmitting = false;
    serverResponse: Observable<HttpErrorResponse>;
    skill = new Skill();
    skillForm: FormGroup;
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
        this.skillForm = this.formBuilder.group({
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
