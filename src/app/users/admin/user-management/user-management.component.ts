import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../../shared/model';
import {UsersService} from '../../../shared/service';

@Component({
    templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {

    user: User;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.user = this.route.snapshot.data['user'];
        this.translate.get('DIALOG.CONFIRMATION').subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteUser(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.usersService.deleteUserAsAdmin(this.user).subscribe(
                () => this.router.navigate(['/admin/users'])
            );
        }
    }
}
