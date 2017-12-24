import {Evaluation, User} from '../../../shared/model';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import {EvaluationsService} from '../../../shared/service';
import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './create-user-evaluation.component.html'
})
export class CreateUserEvaluationComponent implements OnInit {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);
    user: User;

    constructor(private router: Router, private evaluationsService: EvaluationsService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.user = this.route.snapshot.data['user'];
    }

    submit(evaluation: Evaluation): void {
        evaluation.user = this.user;
        this.evaluationsService.createAsUnitLeader(evaluation).subscribe(
            (returnedEvaluation: Evaluation) => {
                this.responseSubject.complete();
                const url = 'unitleader/users/' + this.user.id + '/skills/' + returnedEvaluation.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
