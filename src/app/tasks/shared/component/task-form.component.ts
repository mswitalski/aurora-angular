import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import {Task, ValidationError} from '../../../shared/model';
import {validationConstraints} from '../../../shared/configuration';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {

    taskForm: FormGroup;
    isSubmitting = false;
    serverResponse: Observable<HttpErrorResponse>;
    task = new Task();
    validation = validationConstraints.task;
    validationErrors: ValidationError[] = [];
    todayDate = new Date();
    deadlineDate: Date;
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
    }

    ngOnInit(): void {
        this.createFormControls();
    }

    private createFormControls(): void {
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
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        } else {
            return null;
        }
    }
}
