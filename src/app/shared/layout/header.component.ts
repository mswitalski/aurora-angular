import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user.model';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    loggedUser: User;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.loggedUser.subscribe(user => this.loggedUser = user);
    }

    logout(): void {
        this.authService.logout();
    }
}
