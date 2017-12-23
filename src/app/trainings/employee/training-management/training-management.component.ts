import {Component, OnInit} from '@angular/core';
import {Training} from '../../../shared/model';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscriberComponent} from '../../../shared';

@Component({
    templateUrl: './training-management.component.html'
})
export class TrainingManagementComponent extends AutoUnsubscriberComponent implements OnInit  {

    training: Training;

    constructor(private route: ActivatedRoute) {
        super();
    }

    ngOnInit(): void {
        this.training = this.route.snapshot.data['training'];
    }
}
