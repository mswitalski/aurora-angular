import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Evaluation, SkillLevel, ValidationError} from '../../../msh/model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {validationConstraints} from '../../../msh/configuration';
import {Skill} from '../../../msh';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-evaluation-form',
    templateUrl: './evaluation-form.component.html'
})
export class EvaluationFormComponent implements OnInit {

    availableSkillLevels = [
        {value: SkillLevel.NONE, text: 'SKILL-LEVEL.NONE'},
        {value: SkillLevel.BEGINNER, text: 'SKILL-LEVEL.BEGINNER'},
        {value: SkillLevel.INTERMEDIATE, text: 'SKILL-LEVEL.INTERMEDIATE'},
        {value: SkillLevel.EXPERT, text: 'SKILL-LEVEL.EXPERT'}
    ];
    availableSkills: Skill[] = [];
    evaluation = new Evaluation();
    evaluationForm: FormGroup;
    isEditAction = false;
    isSubmitting = false;
    isUnitLeaderAction = false;
    serverResponse: Observable<HttpErrorResponse>;
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
        this.evaluation.selfEvaluation = SkillLevel.BEGINNER;
        this.evaluation.leaderEvaluation = SkillLevel.BEGINNER;
    }

    ngOnInit(): void {
        if (!this.isEditAction) {
            this.availableSkills = this.route.snapshot.data['skills'];
            this.filterSkills();
        }

        let formControls;

        if (this.isUnitLeaderAction) {
            formControls = {
                'leaderEvaluation': [''],
                'leaderExplanation': [
                    '', [
                        Validators.required,
                        Validators.maxLength(this.validation.leaderExplanation.max)
                    ]
                ]
            };

        } else {
            formControls = {
                'selfEvaluation': [''],
                'selfExplanation': [
                    '', [
                        Validators.required,
                        Validators.maxLength(this.validation.selfExplanation.max)
                    ]
                ]
            };
        }

        this.evaluationForm = this.formBuilder.group(formControls);
    }

    private filterSkills(): void {
        const userSkills: Skill[] = this.route.snapshot.data['evaluations'].map((e: Evaluation) => e.skill);
        this.availableSkills = this.availableSkills
            .filter(val => userSkills.find(us => us.id === val.id) === undefined);
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
