import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {isUndefined} from 'util';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../../../shared';
import {Role, User} from '../../../../shared/model';
import {UsersService} from '../../../../shared/service';

@Component({
    templateUrl: './edit-roles.component.html'
})
export class EditRolesComponent extends AutoUnsubscriberComponent implements OnInit {

    availableRoles: Role[];
    isSubmitting = false;
    user: User;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        super();
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
        this.usersService.updateAsAdmin(this.user).takeUntil(this.ngUnsubscribe).subscribe(
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
}
