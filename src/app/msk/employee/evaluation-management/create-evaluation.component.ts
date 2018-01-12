import {Evaluation} from '../../../msh/model';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Router} from '@angular/router';
import {EvaluationsService} from '../../../msh/service';
import {Component} from '@angular/core';

@Component({
    templateUrl: './create-evaluation.component.html'
})
export class CreateEvaluationComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private evaluationsService: EvaluationsService) {
    }

    submit(evaluation: Evaluation): void {
        this.evaluationsService.createAsEmployee(evaluation).subscribe(
            (returnedEvaluation: Evaluation) => {
                this.responseSubject.complete();
                const url = 'employee/skills/' + returnedEvaluation.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
