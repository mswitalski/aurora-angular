import {Component, OnInit} from '@angular/core';
import {AutoUnsubscriberComponent} from '../../../shared';
import {Feedback, Mentor, User} from '../../../shared/model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, MentorsService} from '../../../shared/service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './mentor-management.component.html'
})
export class MentorManagementComponent extends AutoUnsubscriberComponent implements OnInit {

    mentor: Mentor;
    feedback: Feedback[];
    isMentorOwner = false;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router,
                private mentorsService: MentorsService,
                private translate: TranslateService) {
        super();
    }

    ngOnInit(): void {
        this.mentor = this.route.snapshot.data['mentor'];
        this.feedback = this.route.snapshot.data['feedback'];
        this.translate.get('DIALOG.CONFIRMATION').takeUntil(this.ngUnsubscribe).subscribe(
            msg => this.deleteDialogMessage = msg
        );
        this.authService.loggedUser.takeUntil(this.ngUnsubscribe).subscribe(
            (user: User) => this.isMentorOwner = this.mentor.evaluation.user.id === user.id
        );
    }

    activateMentor(): void {
        if (this.isMentorOwner && !this.mentor.active) {
            this.mentor.active = true;
            this.mentorsService.updateAsEmployee(this.mentor).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.refreshMentor()
            );
        }
    }

    private refreshMentor(): void {
        this.mentorsService.getSingleAsEmployee(this.mentor.id).subscribe(m => this.mentor = m);
    }

    deactivateMentor(): void {
        if (this.isMentorOwner && this.mentor.active) {
            this.mentor.active = false;
            this.mentorsService.updateAsEmployee(this.mentor).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.refreshMentor()
            );
        }
    }

    deleteMentor(): void {
        if (this.isMentorOwner && confirm(this.deleteDialogMessage)) {
            this.mentorsService.deleteAsEmployee(this.mentor).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.router.navigate(['/employee/mentors'])
            );
        }
    }
}
