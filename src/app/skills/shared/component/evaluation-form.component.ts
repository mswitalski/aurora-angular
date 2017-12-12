import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Evaluation, SkillLevel, ValidationError} from '../../../shared/model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {validationConstraints} from '../../../shared/configuration';
import {AutoUnsubscriberComponent, Skill} from '../../../shared';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-evaluation-form',
    templateUrl: './evaluation-form.component.html'
})
export class EvaluationFormComponent extends AutoUnsubscriberComponent implements OnInit {

    availableSkillLevels = [
        { value: SkillLevel.NONE, text: 'SKILL-LEVEL.NONE' },
        { value: SkillLevel.BEGINNER, text: 'SKILL-LEVEL.BEGINNER' },
        { value: SkillLevel.INTERMEDIATE, text: 'SKILL-LEVEL.INTERMEDIATE' },
        { value: SkillLevel.EXPERT, text: 'SKILL-LEVEL.EXPERT' }
    ];
    availableSkills: Skill[] = [];
    evaluationForm: FormGroup;
    isEditAction = false;
    isUnitLeaderAction = false;
    isSubmitting = false;
    serverResponse: Observable<HttpErrorResponse>;
    evaluation = new Evaluation();
    skill: Skill;
    validation = validationConstraints.evaluation;
    validationErrors: ValidationError[] = [];

    @Input() set editedEvaluation(value: Evaluation) {
        this.evaluation = value;
        this.isEditAction = true;
        this.skill = value.skill;
    }

    @Input() set isUnitLeader(value: boolean) {
        this.isUnitLeaderAction = value;
    }

    @Input() set response(value: Observable<HttpErrorResponse>) {
        this.serverResponse = value;
    }

    @Output()
    formSubmitted: EventEmitter<Evaluation> = new EventEmitter();

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private location: Location) {
        super();
    }

    ngOnInit(): void {
        this.availableSkills = this.route.snapshot.data['skills'];
        let formControls;

        if (this.isUnitLeaderAction) {
            formControls = {
                'leaderEvaluation': [''],
                'leaderExplanation': ['', [
                    Validators.maxLength(this.validation.leaderExplanation.max)]
                ]
            };

        } else {
            formControls = {
                'selfEvaluation': [''],
                'selfExplanation': ['', [
                    Validators.maxLength(this.validation.selfExplanation.max)]
                ]
            };
        }

        this.evaluationForm = this.formBuilder.group(formControls);
    }

    goBack(): void {
        this.location.back();
    }

    selectSkill(skill: Skill): void {
        this.skill = skill;
    }

    submitForm(): void {
        this.isSubmitting = true;

        if (!this.isEditAction) {
            this.evaluation.skill = this.skill;
        }

        this.formSubmitted.emit(this.evaluation);
        this.serverResponse.subscribe(
            (error) => {
                if (error.status === 400) {
                    this.validationErrors = error.error;
                }

                this.isSubmitting = false;
            }
        );
    }
}
