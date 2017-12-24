import {Component, OnInit} from '@angular/core';
import {Evaluation} from '../../../shared/model';
import {AuthService, EvaluationsService} from '../../../shared/service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './user-evaluation-management.component.html'
})
export class UserEvaluationManagementComponent implements OnInit {

    evaluation: Evaluation;
    isEvaluationOwner: boolean;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router,
                private evaluationsService: EvaluationsService,
                private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.evaluation = this.route.snapshot.data['evaluation'];
        this.translate.get('DIALOG.CONFIRMATION').subscribe(
            msg => this.deleteDialogMessage = msg
        );
        this.authService.loggedUser.subscribe(
            u => this.route.params.subscribe(
                (params: Params) => this.isEvaluationOwner = u.id === parseInt(params['userId'], 10)
            )
        );
    }

    deleteEvaluation(): void {
        if (!this.isEvaluationOwner && confirm(this.deleteDialogMessage)) {
            this.evaluationsService.deleteAsUnitLeader(this.evaluation).subscribe(
                () => {
                    const url = '/unitleader/users/' + this.evaluation.user.id + '/skills';
                    this.router.navigate([url]);
                }
            );
        }
    }
}
