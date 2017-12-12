import {Component} from '@angular/core';
import {Evaluation} from '../../../shared/model';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './evaluations-list.component.html'
})
export class EvaluationsListComponent {

    evaluationsList: Evaluation[];

    constructor(private route: ActivatedRoute) {
        this.evaluationsList = this.route.snapshot.data['evaluations'];
        this.evaluationsList.sort(
            (e1: Evaluation, e2: Evaluation) => e1.skill.name.localeCompare(e2.skill.name));
    }
}
