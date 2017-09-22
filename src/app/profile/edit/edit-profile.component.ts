import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../shared/service/users.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {ValidationError} from '../../shared/model/validation-error.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
    templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit, OnDestroy {

    editProfileForm: FormGroup;
    isSubmitting = false;
    loggedUser: User;
    validationErrors: ValidationError[];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        this.editProfileForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'name': ['', Validators.required],
            'surname': ['', Validators.required],
            'position': ['', Validators.required],
            'goals': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: {user: User}) => {
                this.loggedUser = data.user;
            }
        );
    }

    submitForm() {
        this.isSubmitting = true;
        this.usersService.update(this.loggedUser).subscribe(
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

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
