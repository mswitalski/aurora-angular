import {Evaluation} from '../../../shared/model';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import {EvaluationsService} from '../../../shared/service';
import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './edit-user-evaluation.component.html'
})
export class EditUserEvaluationComponent implements OnInit {

    evaluation: Evaluation;
    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private route: ActivatedRoute, private router: Router, private evaluationsService: EvaluationsService) {
    }

    ngOnInit(): void {
        this.evaluation = this.route.snapshot.data['evaluation'];
    }

    submit(evaluation: Evaluation): void {
        this.evaluationsService.updateAsUnitLeader(evaluation).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'unitleader/users/' + evaluation.user.id + '/skills/' + evaluation.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
