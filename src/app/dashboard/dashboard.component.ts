import {Component} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {AuthService, OutlookService} from '../shared/service';
import {AutoUnsubscriberComponent} from '../shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends AutoUnsubscriberComponent {

    constructor(private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private outlookService: OutlookService) {
        super();
        this.processUrlFragment();
    }

    private processUrlFragment(): void {
        this.activatedRoute.fragment.takeUntil(this.ngUnsubscribe).subscribe(
            (fragment: string) => {
                if (fragment && fragment.search('state=outlook') !== -1) {
                    this.outlookService.processResponse(fragment);
                }
            }
        );
    }
}
