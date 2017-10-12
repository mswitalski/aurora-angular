import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/model/user.model';
import {ValidationError} from '../../../shared/model/validation-error.model';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../shared/service/users.service';
import {Role} from '../../../shared/model/role.model';
import {isUndefined} from 'util';

@Component({
    templateUrl: './create-user.component.html'
})

export class CreateUserComponent implements OnInit, OnDestroy {

    availableRoles: Role[];
    createUserForm: FormGroup;
    isSubmitting = false;
    user = new User();
    validationErrors: ValidationError[] = [];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        this.createFormControls();
    }

    private createFormControls(): void {
        this.createUserForm = this.formBuilder.group({
            'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            'password': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
            'email': ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
            'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            'surname': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            'position': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            'goals': ['', Validators.maxLength(200)],
            'enabled': ['']
        });
    }

    ngOnInit(): void {
        this.availableRoles = this.route.snapshot.data['roles'];
    }

    assignRole(role: Role): void {
        if (isUndefined(this.user.roles.find(r => r.name === role.name))) {
            this.user.roles.push(role);
        }
    }

    hasRole(role: Role): boolean {
        return this.user.roles.findIndex(r => r.name === role.name) !== -1;
    }

    retractRole(role: Role): void {
        const roleIndex: number = this.user.roles.findIndex(r => r.name === role.name);

        if (roleIndex !== -1) {
            this.user.roles.splice(roleIndex, 1);
        }
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.usersService.createUserAsAdmin(this.user).takeUntil(this.ngUnsubscribe).subscribe(
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
