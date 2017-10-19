import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../shared';
import {User, ValidationError} from '../../shared/model';
import {UsersService} from '../../shared/service';
import {validationConstraints} from '../../shared/configuration';

@Component({
    templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent extends AutoUnsubscriberComponent implements OnInit {

    editProfileForm: FormGroup;
    isSubmitting = false;
    loggedUser: User;
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
        this.editProfileForm = this.formBuilder.group({
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
            'goals': ['', Validators.maxLength(this.validation.goals.max)]
        });
    }

    ngOnInit(): void {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: {user: User}) => {
                this.loggedUser = data.user;
            }
        );
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.usersService.updateOwnAccount(this.loggedUser).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                this.router.navigate(['/profile']);
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
