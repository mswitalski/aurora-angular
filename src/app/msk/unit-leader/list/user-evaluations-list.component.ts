import {Component, OnInit} from '@angular/core';
import {Evaluation, User} from '../../../msh/model';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './user-evaluations-list.component.html'
})
export class UserEvaluationsListComponent implements OnInit {

    evaluationsList: Evaluation[];
    user: User;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.evaluationsList = this.route.snapshot.data['evaluations'];
        this.user = this.route.snapshot.data['user'];
        this.evaluationsList.sort(
            (e1: Evaluation, e2: Evaluation) => e1.skill.name.localeCompare(e2.skill.name));
    }
}
