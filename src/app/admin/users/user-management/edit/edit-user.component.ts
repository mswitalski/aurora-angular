import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../../../shared';
import {User, ValidationError} from '../../../../shared/model';
import {UsersService} from '../../../../shared/service';

@Component({
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends AutoUnsubscriberComponent implements OnInit {

    editUserForm: FormGroup;
    isSubmitting = false;
    user: User;
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
}
