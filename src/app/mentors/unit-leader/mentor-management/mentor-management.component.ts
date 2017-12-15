import {Component, OnInit} from '@angular/core';
import {AutoUnsubscriberComponent} from '../../../shared';
import {Mentor} from '../../../shared/model';
import {ActivatedRoute, Router} from '@angular/router';
import {MentorsService} from '../../../shared/service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './mentor-management.component.html'
})
export class MentorManagementComponent extends AutoUnsubscriberComponent implements OnInit {

    mentor: Mentor;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private mentorsService: MentorsService,
                private translate: TranslateService) {
        super();
    }

    ngOnInit(): void {
        this.mentor = this.route.snapshot.data['mentor'];
        this.translate.get('DIALOG.CONFIRMATION').takeUntil(this.ngUnsubscribe).subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    activateMentor(): void {
        if (!this.mentor.active) {
            this.mentor.active = true;
            this.mentorsService.updateAsUnitLeader(this.mentor).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.refreshMentor()
            );
        }
    }

    private refreshMentor(): void {
        this.mentorsService.getSingleAsUnitLeader(this.mentor.id).subscribe(m => this.mentor = m);
    }

    approveMentor(): void {
        if (!this.mentor.approved) {
            this.mentor.approved = true;
            this.mentorsService.updateAsUnitLeader(this.mentor).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.refreshMentor()
            );
        }
    }

    deactivateMentor(): void {
        if (this.mentor.active) {
            this.mentor.active = false;
            this.mentorsService.updateAsUnitLeader(this.mentor).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.refreshMentor()
            );
        }
    }

    deleteMentor(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.mentorsService.deleteAsUnitLeader(this.mentor).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.router.navigate(['/unitleader/mentors'])
            );
        }
    }
}
