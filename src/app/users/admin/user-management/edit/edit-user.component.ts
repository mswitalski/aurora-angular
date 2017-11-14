import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../../../shared';
import {User} from '../../../../shared/model';
import {UsersService} from '../../../../shared/service';

@Component({
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends AutoUnsubscriberComponent {

    user: User;
    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) {
        super();
        this.user = this.route.snapshot.data['user'];
    }

    submit(user: User): void {
        this.usersService.updateAsAdmin(user).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'admin/users/' + user.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
