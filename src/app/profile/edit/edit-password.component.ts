import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {PasswordChangeFormModel, ValidationError} from '../../shared/model';
import {UsersService} from '../../shared/service';
import {validationConstraints} from '../../shared/configuration';

@Component({
    templateUrl: './edit-password.component.html'
})
export class EditPasswordComponent {

    editPasswordForm: FormGroup;
    formData = new PasswordChangeFormModel();
    isSubmitting = false;
    validation = validationConstraints.user;
    validationErrors: ValidationError[] = [];

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
            }, {validator: this.isPasswordProperlyRepeated})
        });
    }

    private constructValidators(): any {
        return [
            Validators.required,
            Validators.minLength(this.validation.password.min),
            Validators.maxLength(this.validation.password.max)
        ];
    }

    private isPasswordProperlyRepeated(group: FormGroup) {
        const newPassword = group.controls.new.value;
        const repeated = group.controls.repeated.value;

        return newPassword === repeated ? null : {notSame: true};
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.usersService.updateProfilePassword(this.formData).subscribe(
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
