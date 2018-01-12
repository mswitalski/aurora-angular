import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import {Task, ValidationError} from '../../../msh/model';
import {validationConstraints} from '../../../msh/configuration';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DatesUtil} from '../../../msh/util';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html'
})
export class TaskFormComponent {

    deadlineDate: Date;
    isSubmitting = false;
    taskForm: FormGroup;
    serverResponse: Observable<HttpErrorResponse>;
    task = new Task();
    todayDate = new Date();
    validation = validationConstraints.task;
    validationErrors: ValidationError[] = [];
    @Output() formSubmitted: EventEmitter<Task> = new EventEmitter();

    @Input() set editedTask(value: Task) {
        this.task = value;
        this.deadlineDate = new Date(this.task.deadlineDate);
    }

    @Input() set response(value: Observable<HttpErrorResponse>) {
        this.serverResponse = value;
    }

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private location: Location) {
        this.taskForm = this.formBuilder.group({
            'content': [
                '', [
                    Validators.required,
                    Validators.maxLength(this.validation.content.max)
                ]
            ],
            'deadlineDate': ''
        });
    }

    goBack(): void {
        this.location.back();
    }

    submitForm(): void {
        this.task.deadlineDate = this.formatDate(this.deadlineDate);
        this.isSubmitting = true;
        this.formSubmitted.emit(this.task);
        this.serverResponse.subscribe(
            (error) => {
                if (error.status === 400) {
                    this.validationErrors = error.error;
                }

                this.isSubmitting = false;
            }
        );
    }

    private formatDate(date: Date): string {
        if (date) {
            return DatesUtil.formatDate(date);

        } else {
            return null;
        }
    }
}
