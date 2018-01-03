import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';

import {User} from '../../shared/model/index';

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    loggedUser: User;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loggedUser = this.route.snapshot.data['user'];
    }
}
