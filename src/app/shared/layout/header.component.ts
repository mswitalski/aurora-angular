import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {AuthService} from '../service';
import {User} from '../model';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {

    loggedUser: User;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.authService.loggedUser.takeUntil(this.ngUnsubscribe).subscribe(user => this.loggedUser = user);
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
