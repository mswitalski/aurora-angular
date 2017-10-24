import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Router} from '@angular/router';

import {AutoUnsubscriberComponent} from '../../../shared';
import {DutiesService} from '../../../shared/service';
import {Duty} from '../../../shared/model';

@Component({
    templateUrl: './create-duty.component.html'
})
export class CreateDutyComponent extends AutoUnsubscriberComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private dutiesService: DutiesService) {
        super();
    }

    submit(duty: Duty): void {
        this.dutiesService.create(duty).takeUntil(this.ngUnsubscribe).subscribe(
            (savedDuty) => {
                this.responseSubject.complete();
                const url = 'unitleader/duties/' + savedDuty.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
