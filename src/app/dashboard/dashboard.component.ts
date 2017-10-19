import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';

import {AuthService} from '../shared/service';
import {AutoUnsubscriberComponent} from '../shared';
import {User} from '../shared/model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends AutoUnsubscriberComponent implements OnInit {

    loggedUser: User;

    constructor(private authService: AuthService) {
        super();
    }

    ngOnInit() {
        this.authService.loggedUser.takeUntil(this.ngUnsubscribe).subscribe(
            user => this.loggedUser = user
        );
    }
}
