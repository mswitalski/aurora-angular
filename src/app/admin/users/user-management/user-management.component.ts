import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../shared/model/user.model';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Component({
    templateUrl: './user-management.component.html'
})

export class UserManagementComponent implements OnInit, OnDestroy {

    user: User;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: { user: User }) => {
                this.user = data.user;
            }
        );
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
