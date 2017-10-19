import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../shared';
import {PasswordChangeFormModel, ValidationError} from '../../shared/model';
import {UsersService} from '../../shared/service';

@Component({
    templateUrl: './edit-password.component.html'
})
export class EditPasswordComponent extends AutoUnsubscriberComponent {

    editPasswordForm: FormGroup;
    formData = new PasswordChangeFormModel();
    isSubmitting = false;
    validationErrors: ValidationError[] = [];

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private usersService: UsersService) {
        super();
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
}
