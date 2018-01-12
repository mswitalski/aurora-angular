import {Component, OnInit} from '@angular/core';
import {Training} from '../../../msh/model';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './training-management.component.html'
})
export class TrainingManagementComponent implements OnInit {

    training: Training;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.training = this.route.snapshot.data['training'];
    }
}
