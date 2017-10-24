import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../../../shared';
import {DutiesService} from '../../../../shared/service';
import {Duty} from '../../../../shared/model';


@Component({
    templateUrl: './edit-duty.component.html'
})
export class EditDutyComponent extends AutoUnsubscriberComponent {

    duty: Duty;
    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private route: ActivatedRoute, private router: Router, private dutiesService: DutiesService) {
        super();
        this.duty = this.route.snapshot.data['duty'];
    }

    submit(duty: Duty): void {
        this.dutiesService.update(duty).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'unitleader/duties/' + duty.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
