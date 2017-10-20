import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Router} from '@angular/router';

import {AutoUnsubscriberComponent} from '../../../shared';
import {User} from '../../../shared/model';
import {UsersService} from '../../../shared/service';

@Component({
    templateUrl: './create-user.component.html'
})
export class CreateUserComponent extends AutoUnsubscriberComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private usersService: UsersService) {
        super();
    }

    submit(user: User): void {
        this.usersService.createUserAsAdmin(user).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'admin/users/' + user.username;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
