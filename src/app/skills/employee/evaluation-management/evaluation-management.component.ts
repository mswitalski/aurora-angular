import {Component, OnInit} from '@angular/core';
import {Evaluation} from '../../../shared/model';
import {EvaluationsService} from '../../../shared/service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AutoUnsubscriberComponent} from '../../../shared';

@Component({
    templateUrl: './evaluation-management.component.html'
})
export class EvaluationManagementComponent extends AutoUnsubscriberComponent implements OnInit {

    evaluation: Evaluation;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
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
    }

    deleteEvaluation(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.evaluationsService.deleteAsEmployee(this.evaluation).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.router.navigate(['/employee/skills'])
            );
        }
    }
}
