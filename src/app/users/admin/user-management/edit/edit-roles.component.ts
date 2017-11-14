import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../../../shared';
import {DataCheckbox, Role, User} from '../../../../shared/model';
import {UsersService} from '../../../../shared/service';

@Component({
    templateUrl: './edit-roles.component.html'
})
export class EditRolesComponent extends AutoUnsubscriberComponent implements OnInit {

    rolesCheckboxes: DataCheckbox<Role>[] = [];
    isSubmitting = false;
    user: User;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        super();
    }

    ngOnInit(): void {
        this.user = JSON.parse(JSON.stringify(this.route.snapshot.data['user']));
        this.route.snapshot.data['roles'].forEach(
            role => this.rolesCheckboxes.push(new DataCheckbox(role, this.hasRole(role)))
        );
    }

    hasRole(role: Role): boolean {
        return this.user.roles.findIndex(r => r.name === role.name) !== -1;
    }

    submitRoles() {
        this.user.roles = this.rolesCheckboxes.filter(c => c.value).map(c => c.item);
        this.usersService.updateAsAdmin(this.user).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                const url = 'admin/users/' + this.user.id;
                this.router.navigate([url]);
                this.isSubmitting = false;
            },
            error => {
                this.router.navigate(['/error/' + error.status], {skipLocationChange: true});
            }
        );
    }
}
