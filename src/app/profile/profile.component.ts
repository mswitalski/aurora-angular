import {Component, OnInit} from '@angular/core';
import {User} from '../shared/model/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    loggedUser: User;

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe(
            (data: {user: User}) => {
                this.loggedUser = data.user;
            }
        );
    }
}
