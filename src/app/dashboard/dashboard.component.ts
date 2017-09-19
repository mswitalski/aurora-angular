import {Component, OnInit} from '@angular/core';
import {User} from '../shared/model/user.model';
import {AuthService} from '../shared/service/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    loggedUser: User;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.loggedUser.subscribe(
            user => this.loggedUser = user
        );
    }
}
