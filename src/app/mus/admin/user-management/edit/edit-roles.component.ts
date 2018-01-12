import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {DataCheckbox, Role, User} from '../../../../msh/model';
import {UsersService} from '../../../../msh/service';
import {ObjectsUtil} from '../../../../msh/util';

@Component({
    templateUrl: './edit-roles.component.html'
})
export class EditRolesComponent implements OnInit {

    isSubmitting = false;
    rolesCheckboxes: DataCheckbox<Role>[] = [];
    user: User;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.user = ObjectsUtil.clone(this.route.snapshot.data['user']);
        this.route.snapshot.data['roles'].forEach(
            role => this.rolesCheckboxes.push(new DataCheckbox(role, this.hasRole(role)))
        );
    }

    hasRole(role: Role): boolean {
        return this.user.roles.findIndex(r => r.name === role.name) !== -1;
    }

    submitRoles() {
        this.user.roles = this.rolesCheckboxes.filter(c => c.value).map(c => c.item);
        this.usersService.updateAsAdmin(this.user).subscribe(
            () => {
                const url = 'admin/users/' + this.user.id;
                this.router.navigate([url]);
            },
            error => {
                this.router.navigate(['/error/' + error.status], {skipLocationChange: true});
            }
        );
    }
}
