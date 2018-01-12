import {Evaluation} from '../../../msh/model';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import {EvaluationsService} from '../../../msh/service';
import {Component, OnInit} from '@angular/core';
import {ObjectsUtil} from '../../../msh/util';

@Component({
    templateUrl: './edit-evaluation.component.html'
})
export class EditEvaluationComponent implements OnInit {

    evaluation: Evaluation;
    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private route: ActivatedRoute, private router: Router, private evaluationsService: EvaluationsService) {
    }

    ngOnInit(): void {
        this.evaluation = ObjectsUtil.clone(this.route.snapshot.data['evaluation']);
    }

    submit(evaluation: Evaluation): void {
        this.evaluationsService.updateAsEmployee(evaluation).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'employee/skills/' + evaluation.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
