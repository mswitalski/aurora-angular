import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User, ValidationError} from '../../../../shared/model';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {UsersService} from '../../../../shared/service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    templateUrl: './edit-user.component.html'
})

export class EditUserComponent implements OnInit, OnDestroy {

    editUserForm: FormGroup;
    isSubmitting = false;
    user: User;
    validationErrors: ValidationError[];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        this.createFormControls();
    }

    private createFormControls(): void {
        this.editUserForm = this.formBuilder.group({
            'email': ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
            'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            'surname': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            'position': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            'goals': ['', Validators.maxLength(200)],
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

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
