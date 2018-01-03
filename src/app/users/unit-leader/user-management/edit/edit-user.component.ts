import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {User} from '../../../../shared/model';
import {UsersService} from '../../../../shared/service';
import {environment} from '../../../../../environments/environment';
import {ObjectsUtil} from '../../../../shared/util';

@Component({
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent {

    user: User;
    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) {
        this.user = ObjectsUtil.clone(this.route.snapshot.data['user']);
        this.redirectIfNotEmployeeUser();
    }

    private redirectIfNotEmployeeUser() {
        if (this.user.roles.length !== 1 || this.user.roles[0].name !== environment.employeeRole) {
            this.router.navigate(['/error/403'], {skipLocationChange: true});
        }
    }

    submit(user: User): void {
        this.usersService.updateAsUnitLeader(user).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'unitleader/users/' + user.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
