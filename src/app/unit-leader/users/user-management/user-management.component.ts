import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {isUndefined} from 'util';
import {TranslateService} from '@ngx-translate/core';

import {AutoUnsubscriberComponent} from '../../../shared';
import {User} from '../../../shared/model';
import {UsersService} from '../../../shared/service';
import {environment} from '../../../../environments/environment';

@Component({
    templateUrl: './user-management.component.html'
})
export class UserManagementComponent extends AutoUnsubscriberComponent implements OnInit {

    user: User;
    isNotAdminUser: boolean;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService,
                private translate: TranslateService) {
        super();
    }

    ngOnInit() {
        this.user = this.route.snapshot.data['user'];
        this.isNotAdminUser = isUndefined(this.user.roles.find(r => r.name === environment.adminRole));
        this.translate.get('DIALOG.CONFIRMATION').takeUntil(this.ngUnsubscribe).subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteUser(): void {
        if (this.isNotAdminUser && confirm(this.deleteDialogMessage)) {
            this.usersService.deleteUser(this.user).takeUntil(this.ngUnsubscribe).subscribe(
                () => {
                    this.router.navigate(['/unitleader/users']);
                }
            );
        }
    }
}