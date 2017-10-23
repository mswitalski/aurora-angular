import {ActivatedRoute} from '@angular/router';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {isUndefined} from 'util';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {AutoUnsubscriberComponent} from '../../../shared/auto-unsubscriber.component';
import {Role, User, ValidationError} from '../../../shared/model';
import {validationConstraints} from '../../../shared/configuration';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html'
})
export class UserFormComponent extends AutoUnsubscriberComponent implements OnInit {

    allowRolesSelect: boolean;
    availableRoles: Role[];
    userForm: FormGroup;
    isEditAction = false;
    isSubmitting = false;
    moduleUrl: string;
    serverResponse: Observable<HttpErrorResponse>;
    user = new User();
    validation = validationConstraints.user;
    validationErrors: ValidationError[] = [];

    @Input() set editedUser(value: User) {
        this.user = value;
        this.isEditAction = true;
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
    }

    ngOnInit(): void {
        this.availableRoles = this.route.snapshot.data['roles'];
        this.allowRolesSelect = this.moduleUrl.includes('admin') && !this.isEditAction;
        this.createFormControls();
    }

    private createFormControls(): void {
        const formControls = {
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
        };

        if (!this.isEditAction) {
            formControls['username'] = ['', [
                Validators.required,
                Validators.minLength(this.validation.username.min),
                Validators.maxLength(this.validation.username.max)]
            ];
            formControls['password'] = ['', [
                Validators.required,
                Validators.minLength(this.validation.password.min),
                Validators.maxLength(this.validation.password.max)]
            ];
        }

        this.userForm = this.formBuilder.group(formControls);
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

    console() {
        console.log(this.userForm.errors);
        console.log(this.userForm.valid);
        console.log(this.userForm.status);
    }
}
