import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';

import {User} from '../shared/model';
import {AutoUnsubscriberComponent} from '../shared/auto-unsubscriber.component';

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent extends AutoUnsubscriberComponent implements OnInit {

    loggedUser: User;

    constructor(private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: { user: User }) => {
                this.loggedUser = data.user;
            }
        );
    }
}
