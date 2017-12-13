import {Component, OnInit} from '@angular/core';
import {Evaluation} from '../../../shared/model';
import {AuthService, EvaluationsService} from '../../../shared/service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AutoUnsubscriberComponent} from '../../../shared';

@Component({
    templateUrl: './user-evaluation-management.component.html'
})
export class UserEvaluationManagementComponent extends AutoUnsubscriberComponent implements OnInit {

    evaluation: Evaluation;
    isEvaluationOwner: boolean;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router,
                private evaluationsService: EvaluationsService,
                private translate: TranslateService) {
        super();
    }

    ngOnInit(): void {
        this.evaluation = this.route.snapshot.data['evaluation'];
        this.translate.get('DIALOG.CONFIRMATION').takeUntil(this.ngUnsubscribe).subscribe(
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
            this.evaluationsService.deleteUserAsEmployee(this.evaluation).takeUntil(this.ngUnsubscribe).subscribe(
                () => {
                    const url = '/unitleader/users/' + this.evaluation.user.id + '/skills';
                    this.router.navigate([url]);
                }
            );
        }
    }
}
