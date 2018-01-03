import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DutiesService} from '../../../shared/service';
import {Duty} from '../../../shared/model';

@Component({
    templateUrl: './duty-management.component.html'
})
export class DutyManagementComponent implements OnInit {

    duty: Duty;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dutiesService: DutiesService,
                private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.duty = this.route.snapshot.data['duty'];
        this.translate.get('DIALOG.CONFIRMATION').subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteDuty(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.dutiesService.deleteDuty(this.duty).subscribe(
                () => this.router.navigate(['/unitleader/duties'])
            );
        }
    }
}
