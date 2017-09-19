import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    loggedUser: User;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.authService.loggedUser.subscribe(user => this.loggedUser = user);
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
