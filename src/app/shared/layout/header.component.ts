import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import {AuthService, OutlookService} from '../service';
import {User} from '../model';
import {AutoUnsubscriberComponent} from '../auto-unsubscriber.component';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent extends AutoUnsubscriberComponent implements OnInit {

    loggedUser: User;
    isOutlookLogged: boolean;

    constructor(private authService: AuthService, private router: Router, public outlookService: OutlookService) {
        super();
        this.outlookService.isTokenPresent.subscribe((v: boolean) => this.isOutlookLogged = v);
    }

    ngOnInit(): void {
        this.authService.loggedUser.takeUntil(this.ngUnsubscribe).subscribe((user: User) => this.loggedUser = user);
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    toggleSidebar(): void {
        document.getElementById('sidebar').classList.toggle('inactive');
        document.getElementById('content').classList.toggle('active');
    }
}
