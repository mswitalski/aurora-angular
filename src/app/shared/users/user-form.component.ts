import {ActivatedRoute} from '@angular/router';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {isUndefined} from 'util';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {AutoUnsubscriberComponent} from '../auto-unsubscriber.component';
import {Role, User, ValidationError} from '../model';
import {validationConstraints} from '../configuration';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html'
})
export class UserFormComponent extends AutoUnsubscriberComponent implements OnInit {

    availableRoles: Role[];
    userForm: FormGroup;
    isEditAction: boolean;
    isSubmitting = false;
    moduleUrl: string;
    serverResponse: Observable<HttpErrorResponse>;
    user = new User();
    validation = validationConstraints.user;
    validationErrors: ValidationError[] = [];

    @Input() set isEdit(value: boolean) {
        this.isEditAction = value;
    }

    @Input() set response(value: Observable<HttpErrorResponse>) {
        this.serverResponse = value;
    }

    @Input() set module(value: string) {
        this.moduleUrl = value;
    }

    @Output()
    formSubmitted: EventEmitter<User> = new EventEmitter();

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private location: Location) {
        super();
        this.createFormControls();
    }

    private createFormControls(): void {
        this.userForm = this.formBuilder.group({
            'username': ['', [
                Validators.required,
                Validators.minLength(this.validation.username.min),
                Validators.maxLength(this.validation.username.max)]
            ],
            'password': ['', [
                Validators.required,
                Validators.minLength(this.validation.password.min),
                Validators.maxLength(this.validation.password.max)]
            ],
            'email': ['', [
                Validators.required,
                Validators.email,
                Validators.maxLength(this.validation.email.max)]
            ],
            'name': ['', [
                Validators.required,
                Validators.minLength(this.validation.name.min),
                Validators.maxLength(this.validation.name.max)]
            ],
            'surname': ['', [
                Validators.required,
                Validators.minLength(this.validation.surname.min),
                Validators.maxLength(this.validation.surname.max)]
            ],
            'position': ['', [
                Validators.required,
                Validators.minLength(this.validation.position.min),
                Validators.maxLength(this.validation.position.max)
            ]],
            'goals': ['', Validators.maxLength(this.validation.goals.max)],
            'enabled': ['']
        });
    }

    ngOnInit(): void {
        this.availableRoles = this.route.snapshot.data['roles'];
    }

    assignRole(role: Role): void {
        if (isUndefined(this.user.roles.find(r => r.name === role.name))) {
            this.user.roles.push(role);
        }
    }

    goBack(): void {
        this.location.back();
    }

    hasRole(role: Role): boolean {
        return this.user.roles.findIndex(r => r.name === role.name) !== -1;
    }

    retractRole(role: Role): void {
        const roleIndex: number = this.user.roles.findIndex(r => r.name === role.name);

        if (roleIndex !== -1) {
            this.user.roles.splice(roleIndex, 1);
        }
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.formSubmitted.emit(this.user);
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
