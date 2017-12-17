import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Feedback, ValidationError} from '../../../shared/model';
import {validationConstraints} from '../../../shared/configuration';
import {Location} from '@angular/common';
import {AutoUnsubscriberComponent} from '../../../shared';
import {AuthService, FeedbackService} from '../../../shared/service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    templateUrl: 'create-feedback.component.html'
})
export class CreateFeedbackComponent extends AutoUnsubscriberComponent implements OnInit {

    feedbackForm: FormGroup;
    isSubmitting = false;
    feedback = new Feedback();
    validation = validationConstraints.feedback;
    validationErrors: ValidationError[] = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private location: Location,
                private feedbackService: FeedbackService,
                private authService: AuthService
    ) {
        super();
        this.feedbackForm = this.formBuilder.group({
            'content': ['', [Validators.maxLength(this.validation.content.max)]],
            'satisfied': new FormControl('true')
        });
    }

    ngOnInit(): void {
        this.feedback.mentor = this.route.snapshot.data['mentor'];
        this.authService.loggedUser.takeUntil(this.ngUnsubscribe).subscribe(
            user => {
                if (user.id === this.feedback.mentor.evaluation.user.id) {
                    this.router.navigate(['/employee/mentors/' + this.feedback.mentor.id]);
                }
            }
        );
    }

    goBack(): void {
        this.router.navigate(['/employee/mentors/' + this.feedback.mentor.id]);
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.feedback.satisfied = this.feedbackForm.get('satisfied').value;
        this.feedbackService.create(this.feedback).subscribe(
            () => this.router.navigate(['/employee/mentors/' + this.feedback.mentor.id]),
            (error) => {
                if (error.status === 400) {
                    this.validationErrors = error.error;
                }

                this.isSubmitting = false;
            }
        );
    }
}
