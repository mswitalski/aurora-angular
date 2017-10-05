import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {RolesService, UsersService} from '../../../../shared/service';
import {Role, User} from '../../../../shared/model';

@Component({
    templateUrl: './edit-roles.component.html'
})

export class EditRolesComponent implements OnInit, OnDestroy {

    isSubmitting = false;
    user: User;
    roles: Role[];
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
            }
        );
    }

    hasRole(role: Role): boolean {
        return this.user.roles.findIndex(r => r.name === role.name) !== -1;
    }

    retractRole(role: Role): void {
        this.usersService.retractRole(this.user, role).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                const url = 'admin/users/' + this.user.username;
                this.router.navigate([url]);
            }
        );
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
