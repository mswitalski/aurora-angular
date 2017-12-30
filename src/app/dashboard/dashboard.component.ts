import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';

import {AuthService, OutlookService} from '../shared/service';
import {AutoUnsubscriberComponent} from '../shared';
import {User} from '../shared/model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends AutoUnsubscriberComponent implements OnInit {

    loggedUser: User;

    constructor(private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private outlookService: OutlookService) {
        super();
        this.processUrlFragment();
    }

    private processUrlFragment(): void {
        this.activatedRoute.fragment.takeUntil(this.ngUnsubscribe).subscribe(
            (f: string) => {
                if (f && f.search('state=outlook') !== -1) {
                    this.outlookService.processResponse(f);
                }
            }
        );
    }

    ngOnInit() {
        this.authService.loggedUser.takeUntil(this.ngUnsubscribe).subscribe(
            user => this.loggedUser = user
        );
    }
}
