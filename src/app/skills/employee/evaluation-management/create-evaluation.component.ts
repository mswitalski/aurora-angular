import {AutoUnsubscriberComponent} from '../../../shared';
import {Evaluation} from '../../../shared/model';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Router} from '@angular/router';
import {EvaluationsService} from '../../../shared/service';
import {Component} from '@angular/core';

@Component({
    templateUrl: './create-evaluation.component.html'
})
export class CreateEvaluationComponent extends AutoUnsubscriberComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private evaluationsService: EvaluationsService) {
        super();
    }

    submit(evaluation: Evaluation): void {
        this.evaluationsService.createAsEmployee(evaluation).takeUntil(this.ngUnsubscribe).subscribe(
            (returnedEvaluation: Evaluation) => {
                this.responseSubject.complete();
                const url = 'employee/skills/' + returnedEvaluation.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
