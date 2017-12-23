import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AutoUnsubscriberComponent} from '../../../../shared';
import {TrainingsService} from '../../../../shared/service';
import {Training} from '../../../../shared/model';

@Component({
    templateUrl: './edit-training.component.html'
})
export class EditTrainingComponent extends AutoUnsubscriberComponent implements OnInit {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);
    training: Training;

    constructor(private route: ActivatedRoute, private router: Router, private trainingsService: TrainingsService) {
        super();
    }

    ngOnInit(): void {
        this.training = this.route.snapshot.data['training'];
    }

    submit(training: Training): void {
        this.trainingsService.update(training).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'unitleader/trainings/' + training.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
