import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import {AuthService} from '../service';
import {User} from '../model';
import {AutoUnsubscriberComponent} from '../auto-unsubscriber.component';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent extends AutoUnsubscriberComponent implements OnInit {

    loggedUser: User;

    constructor(private authService: AuthService, private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.authService.loggedUser.takeUntil(this.ngUnsubscribe).subscribe(user => this.loggedUser = user);
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
