import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminPasswordChangeFormModel, User, ValidationError} from '../../../../msh/model';
import {UsersService} from '../../../../msh/service';
import {validationConstraints} from '../../../../msh/configuration';
import {ObjectsUtil} from '../../../../msh/util';

@Component({
    templateUrl: './edit-password.component.html'
})
export class EditPasswordComponent implements OnInit {

    editPasswordForm: FormGroup;
    formData = new AdminPasswordChangeFormModel();
    isSubmitting = false;
    user: User;
    validation = validationConstraints.user;
    validationErrors: ValidationError[] = [];

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        this.editPasswordForm = this.formBuilder.group({
            'new': ['', this.constructValidators()],
            'repeated': ['', this.constructValidators()]
        }, {validator: this.isPasswordProperlyRepeated});
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

    ngOnInit(): void {
        this.user = ObjectsUtil.clone(this.route.snapshot.data['user']);
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.usersService.updateOtherPassword(this.user, this.formData).subscribe(
            () => {
                const url = 'admin/users/' + this.user.id;
                this.router.navigate([url]);
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
