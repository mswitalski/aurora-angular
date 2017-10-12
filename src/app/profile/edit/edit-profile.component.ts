import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';

import {User, ValidationError} from '../../shared/model';
import {UsersService} from '../../shared/service';

@Component({
    templateUrl: './edit-profile.component.html'
})

export class EditProfileComponent implements OnInit, OnDestroy {

    editProfileForm: FormGroup;
    isSubmitting = false;
    loggedUser: User;
    validationErrors: ValidationError[] = [];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        this.createFormControls();
    }

    private createFormControls(): void {
        this.editProfileForm = this.formBuilder.group({
            'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            'surname': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            'goals': ['', Validators.maxLength(200)]
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

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
