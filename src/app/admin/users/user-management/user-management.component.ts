import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../shared/model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {UsersService} from '../../../shared/service/users.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './user-management.component.html'
})

export class UserManagementComponent implements OnInit, OnDestroy {

    user: User;
    private deleteDialogMessage: string;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: { user: User }) => {
                this.user = data.user;
            }
        );
        this.translate.get('DIALOG.CONFIRMATION').takeUntil(this.ngUnsubscribe).subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteUser(dialogMessage: string) {
        if (confirm(this.deleteDialogMessage)) {
            this.usersService.deleteUser(this.user).takeUntil(this.ngUnsubscribe).subscribe(
                () => {
                    this.router.navigate(['/admin/users']);
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
