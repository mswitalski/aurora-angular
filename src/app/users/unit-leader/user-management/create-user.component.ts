import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Router} from '@angular/router';
import {User} from '../../../shared/model';
import {UsersService} from '../../../shared/service';

@Component({
    templateUrl: './create-user.component.html'
})
export class CreateUserComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private usersService: UsersService) {
    }

    submit(user: User): void {
        this.usersService.createUserAsUnitLeader(user).subscribe(
            (receivedUser: User) => {
                this.responseSubject.complete();
                const url = 'unitleader/users/' + receivedUser.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
