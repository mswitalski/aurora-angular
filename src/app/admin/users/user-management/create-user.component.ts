import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isUndefined} from 'util';

import {AutoUnsubscriberComponent} from '../../../shared';
import {Role, User, ValidationError} from '../../../shared/model';
import {UsersService} from '../../../shared/service';
import {validationConstraints} from '../../../shared/configuration';

@Component({
    templateUrl: './create-user.component.html'
})
export class CreateUserComponent extends AutoUnsubscriberComponent implements OnInit {

    availableRoles: Role[];
    createUserForm: FormGroup;
    isSubmitting = false;
    user = new User();
    validation = validationConstraints.user;
    validationErrors: ValidationError[] = [];

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        super();
        this.createFormControls();
    }

    private createFormControls(): void {
        this.createUserForm = this.formBuilder.group({
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
                Validators.minLength(this.validation.name.max),
                Validators.maxLength(this.validation.name.max)]
            ],
            'surname': ['', [
                Validators.required,
                Validators.minLength(this.validation.surname.max),
                Validators.maxLength(this.validation.surname.max)]
            ],
            'position': ['', [
                Validators.required,
                Validators.minLength(this.validation.position.max),
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
        this.usersService.createUserAsAdmin(this.user).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                const url = 'admin/users/' + this.user.username;
                this.router.navigate([url]);
                this.isSubmitting = false;
            },
            error => {
                if (error.status === 400) {
                    this.validationErrors = error.error;
                }

                this.isSubmitting = false;
            }
        );
    }
}
