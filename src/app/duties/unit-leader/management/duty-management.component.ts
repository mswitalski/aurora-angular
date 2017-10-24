import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import {AutoUnsubscriberComponent} from '../../../shared';
import {DutiesService} from '../../../shared/service';
import {Duty} from '../../../shared/model';

@Component({
    templateUrl: './duty-management.component.html'
})
export class DutyManagementComponent extends AutoUnsubscriberComponent implements OnInit {

    duty: Duty;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dutiesService: DutiesService,
                private translate: TranslateService) {
        super();
    }

    ngOnInit(): void {
        this.duty = this.route.snapshot.data['duty'];
        this.translate.get('DIALOG.CONFIRMATION').takeUntil(this.ngUnsubscribe).subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteDuty(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.dutiesService.deleteDuty(this.duty).takeUntil(this.ngUnsubscribe).subscribe(
                () => {
                    this.router.navigate(['/unitleader/duties']);
                }
            );
        }
    }
}
