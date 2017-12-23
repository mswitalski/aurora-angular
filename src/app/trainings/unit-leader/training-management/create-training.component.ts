import {Component} from '@angular/core';
import {AutoUnsubscriberComponent} from '../../../shared';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TrainingsService} from '../../../shared/service';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Training} from '../../../shared/model';

@Component({
    templateUrl: './create-training.component.html'
})
export class CreateTrainingComponent extends AutoUnsubscriberComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private trainingsService: TrainingsService) {
        super();
    }

    submit(training: Training): void {
        this.trainingsService.create(training).takeUntil(this.ngUnsubscribe).subscribe(
            (receivedTraining: Training) => {
                this.responseSubject.complete();
                const url = 'unitleader/trainings/' + receivedTraining.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
