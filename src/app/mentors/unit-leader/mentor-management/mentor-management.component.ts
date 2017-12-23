import {Component, OnInit} from '@angular/core';
import {AutoUnsubscriberComponent} from '../../../shared';
import {Feedback, Mentor} from '../../../shared/model';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedbackService, MentorsService} from '../../../shared/service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './mentor-management.component.html'
})
export class MentorManagementComponent extends AutoUnsubscriberComponent implements OnInit {

    mentor: Mentor;
    feedback: Feedback[];
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private mentorsService: MentorsService,
                private feedbackService: FeedbackService,
                private translate: TranslateService) {
        super();
    }

    ngOnInit(): void {
        this.mentor = this.route.snapshot.data['mentor'];
        this.feedback = this.route.snapshot.data['feedback'];
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

    deleteFeedback(feedback: Feedback): void {
        if (confirm(this.deleteDialogMessage)) {
            this.feedbackService.delete(feedback).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.feedback = this.feedback.filter(f => f.id !== feedback.id)
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