import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../shared/model/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../../shared/service/users.service';
import {ValidationError} from '../../../../shared/model/validation-error.model';
import {Role} from '../../../../shared/model/role.model';
import {RolesService} from '../../../../shared/service';
import {HttpResponse} from '@angular/common/http';
import {isUndefined} from 'util';

@Component({
    templateUrl: './edit-roles.component.html'
})

export class EditRolesComponent implements OnInit, OnDestroy {

    isSubmitting = false;
    user: User;
    roles: Role[];
    validationErrors: ValidationError[];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private rolesService: RolesService,
                private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: {user: User}) => {
                this.user = data.user;
            }
        );
        this.rolesService.getAll().takeUntil(this.ngUnsubscribe).subscribe(
            (data: HttpResponse<Role[]>) => {
                this.roles = data.body;
            }
        );
    }

    assignRole(role: Role): void {
        this.usersService.assignRole(this.user, role).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                const url = 'admin/users/' + this.user.username;
                this.router.navigate([url]);
            },
            error => {}
        );
    }

    retractRole(role: Role): void {
        this.usersService.retractRole(this.user, role).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                const url = 'admin/users/' + this.user.username;
                this.router.navigate([url]);
            },
            error => {}
        );
    }

    hasRole(role: Role): boolean {
        return this.user.roles.findIndex(r => r.name === role.name) !== -1;
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
