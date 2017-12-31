import {Component, OnInit} from '@angular/core';
import {Training} from '../../../shared/model';
import {TrainingsService} from '../../../shared/service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    templateUrl: './training-management.component.html'
})
export class TrainingManagementComponent implements OnInit {

    training: Training;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private trainingsService: TrainingsService,
                private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.training = this.route.snapshot.data['training'];
        this.translate.get('DIALOG.CONFIRMATION').subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteTraining(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.trainingsService.delete(this.training).subscribe(
                () => this.router.navigate(['/unitleader/trainings'])
            );
        }
    }
}
