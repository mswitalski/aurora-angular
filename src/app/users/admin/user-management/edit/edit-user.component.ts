import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {User} from '../../../../shared/model';
import {UsersService} from '../../../../shared/service';

@Component({
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit{

    user: User;
    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.user = this.route.snapshot.data['user'];
    }

    submit(user: User): void {
        this.usersService.updateAsAdmin(user).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'admin/users/' + user.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
