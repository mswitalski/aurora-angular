import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isUndefined} from 'util';

import {AutoUnsubscriberComponent} from '../../../shared';
import {Role, User, ValidationError} from '../../../shared/model';
import {UsersService} from '../../../shared/service';

@Component({
    templateUrl: './create-user.component.html'
})
export class CreateUserComponent extends AutoUnsubscriberComponent implements OnInit {

    availableRoles: Role[];
    createUserForm: FormGroup;
    isSubmitting = false;
    user = new User();
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
            'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            'password': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
            'email': ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
            'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            'surname': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            'position': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            'goals': ['', Validators.maxLength(200)],
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
