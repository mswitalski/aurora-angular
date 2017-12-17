import {Component, OnInit} from '@angular/core';
import {Evaluation, Mentor, Skill, SkillLevel, ValidationError} from '../../../shared/model';
import {ActivatedRoute, Router} from '@angular/router';
import {MentorsService} from '../../../shared/service';

@Component({
    templateUrl: './create-mentor.component.html'
})
export class CreateMentorComponent implements OnInit {

    evaluations: Evaluation[];
    mentor = new Mentor();
    isSubmitting = false;
    validationErrors: ValidationError[] = [];

    constructor(private route: ActivatedRoute, private mentorsService: MentorsService, private router: Router) {
    }

    ngOnInit(): void {
        this.evaluations = this.route.snapshot.data['evaluations'];
        const mySkills = this.route.snapshot.data['myMentors'].map((m: Mentor) => m.evaluation.skill);
        this.filterEvaluations(mySkills);
    }

    private filterEvaluations(mySkills: Skill[]): void {
        this.evaluations = this.evaluations.filter(
            e => e.leaderEvaluation === SkillLevel.EXPERT || e.leaderEvaluation === SkillLevel.INTERMEDIATE);
        this.evaluations = this.evaluations.filter(
            e => mySkills.filter(s => s.id === e.skill.id).length === 0);
    }

    selectEvaluation(evaluation: Evaluation): void {
        this.mentor.evaluation = evaluation;
    }

    submit(): void {
        this.isSubmitting = true;
        this.mentorsService.create(this.mentor).subscribe(
            (receivedMentor: Mentor) => {
                const url = 'employee/mentors/' + receivedMentor.id;
                this.router.navigate([url]);
            },
            (error) => {
                if (error.status === 400) {
                    this.validationErrors = error.error;
                }

                this.isSubmitting = false;
            }
        );
    }
}
