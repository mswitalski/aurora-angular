import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';

import {UsersService} from '../../shared/service';
import {ValidationError} from '../../shared/model';
import {PasswordChangeFormModel} from '../../shared/model/password-change-form.model';

@Component({
    templateUrl: './edit-password.component.html'
})

export class EditPasswordComponent implements OnDestroy {

    editPasswordForm: FormGroup;
    isSubmitting = false;
    validationErrors: ValidationError[] = [];
    formData = new PasswordChangeFormModel();
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private usersService: UsersService) {
        this.createFormControls();
    }

    private createFormControls(): void {
        this.editPasswordForm = this.formBuilder.group({
            'current-password': ['', this.constructValidators()],
            'new-passwords': this.formBuilder.group({
                'new': ['', this.constructValidators()],
                'repeated': ['', this.constructValidators()]
            }, { validator: this.isPasswordProperlyRepeated })
        });
    }

    private constructValidators(): any {
        return [Validators.required, Validators.minLength(3), Validators.maxLength(60)];
    }

    private isPasswordProperlyRepeated(group: FormGroup) {
        const newPassword = group.controls.new.value;
        const repeated = group.controls.repeated.value;

        return newPassword === repeated ? null : { notSame: true };
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.usersService.updateOwnPassword(this.formData).takeUntil(this.ngUnsubscribe).subscribe(
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
