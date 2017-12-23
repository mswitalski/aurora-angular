import {Component, OnInit} from '@angular/core';
import {Training} from '../../../shared/model';
import {TrainingsService} from '../../../shared/service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AutoUnsubscriberComponent} from '../../../shared';

@Component({
    templateUrl: './training-management.component.html'
})
export class TrainingManagementComponent extends AutoUnsubscriberComponent implements OnInit  {

    training: Training;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private trainingsService: TrainingsService,
                private translate: TranslateService) {
        super();
    }

    ngOnInit(): void {
        this.training = this.route.snapshot.data['training'];
        this.translate.get('DIALOG.CONFIRMATION').takeUntil(this.ngUnsubscribe).subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteTraining(): void {
        this.trainingsService.delete(this.training).takeUntil(this.ngUnsubscribe).subscribe(
            () => this.router.navigate(['/unitleader/trainings'])
        );
    }
}
