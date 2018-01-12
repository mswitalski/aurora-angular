import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {TrainingsService} from '../../../../msh/service';
import {Training} from '../../../../msh/model';
import {ObjectsUtil} from '../../../../msh/util';

@Component({
    templateUrl: './edit-training.component.html'
})
export class EditTrainingComponent implements OnInit {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);
    training: Training;

    constructor(private route: ActivatedRoute, private router: Router, private trainingsService: TrainingsService) {
    }

    ngOnInit(): void {
        this.training = ObjectsUtil.clone(this.route.snapshot.data['training']);
    }

    submit(training: Training): void {
        this.trainingsService.update(training).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'unitleader/trainings/' + training.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
