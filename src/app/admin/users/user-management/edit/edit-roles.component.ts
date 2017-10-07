import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {UsersService} from '../../../../shared/service';
import {Role, User} from '../../../../shared/model';
import {isUndefined} from 'util';

@Component({
    templateUrl: './edit-roles.component.html'
})

export class EditRolesComponent implements OnInit, OnDestroy {

    isSubmitting = false;
    user: User;
    availableRoles: Role[];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(JSON.stringify(this.route.snapshot.data['user']));
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

    submitRoles() {
        this.usersService.updateOtherAccountAsAdmin(this.user).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                const url = 'admin/users/' + this.user.username;
                this.router.navigate([url]);
                this.isSubmitting = false;
            },
            error => {
                this.router.navigate(['/error/' + error.status], {skipLocationChange: true});
            }
        );
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
