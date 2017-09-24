import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';

import {AuthService} from '../shared/service';
import {User} from '../shared/model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {

    loggedUser: User;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.loggedUser.takeUntil(this.ngUnsubscribe).subscribe(
            user => this.loggedUser = user
        );
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
