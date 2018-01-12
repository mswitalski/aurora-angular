import {Component, OnInit} from '@angular/core';
import {Evaluation} from '../../../msh/model';
import {EvaluationsService} from '../../../msh/service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './evaluation-management.component.html'
})
export class EvaluationManagementComponent implements OnInit {

    evaluation: Evaluation;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private evaluationsService: EvaluationsService,
                private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.evaluation = this.route.snapshot.data['evaluation'];
        this.translate.get('DIALOG.CONFIRMATION').subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteEvaluation(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.evaluationsService.deleteAsEmployee(this.evaluation).subscribe(
                () => this.router.navigate(['/employee/skills'])
            );
        }
    }
}
