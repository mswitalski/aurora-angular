import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AdminPasswordChangeFormModel, User, ValidationError} from '../../../../shared/model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../../shared/service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    templateUrl: './edit-password.component.html'
})

export class EditPasswordComponent implements OnInit, OnDestroy {

    editPasswordForm: FormGroup;
    isSubmitting = false;
    validationErrors: ValidationError[];
    formData = new AdminPasswordChangeFormModel();
    user: User;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        this.createFormControls();
    }

    private createFormControls(): void {
        this.editPasswordForm = this.formBuilder.group({
            'new': ['', this.constructValidators()],
            'repeated': ['', this.constructValidators()]
        }, { validator: this.isPasswordProperlyRepeated });
    }

    private constructValidators(): any {
        return [Validators.required, Validators.minLength(3), Validators.maxLength(60)];
    }

    private isPasswordProperlyRepeated(group: FormGroup) {
        const newPassword = group.controls.new.value;
        const repeated = group.controls.repeated.value;

        return newPassword === repeated ? null : { notSame: true };
    }

    ngOnInit(): void {
        this.user = JSON.parse(JSON.stringify(this.route.snapshot.data['user']));
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.usersService.updateOtherPassword(this.user, this.formData).takeUntil(this.ngUnsubscribe).subscribe(
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
