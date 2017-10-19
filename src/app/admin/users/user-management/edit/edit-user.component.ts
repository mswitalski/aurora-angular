import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../../../shared';
import {User, ValidationError} from '../../../../shared/model';
import {UsersService} from '../../../../shared/service';
import {validationConstraints} from '../../../../shared/configuration';

@Component({
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends AutoUnsubscriberComponent implements OnInit {

    editUserForm: FormGroup;
    isSubmitting = false;
    user: User;
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
        this.editUserForm = this.formBuilder.group({
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
        this.user = JSON.parse(JSON.stringify(this.route.snapshot.data['user']));
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.usersService.updateOtherAccountAsAdmin(this.user).takeUntil(this.ngUnsubscribe).subscribe(
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
