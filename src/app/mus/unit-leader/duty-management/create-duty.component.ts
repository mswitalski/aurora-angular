import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Router} from '@angular/router';
import {DutiesService} from '../../../msh/service';
import {Duty} from '../../../msh/model';

@Component({
    templateUrl: './create-duty.component.html'
})
export class CreateDutyComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private dutiesService: DutiesService) {
    }

    submit(duty: Duty): void {
        this.dutiesService.create(duty).subscribe(
            (savedDuty) => {
                this.responseSubject.complete();
                const url = 'unitleader/duties/' + savedDuty.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
