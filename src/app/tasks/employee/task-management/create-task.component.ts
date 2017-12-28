import {Component} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {HttpErrorResponse} from '@angular/common/http';
import {TasksService} from '../../../shared/service';
import {Task} from '../../../shared/model';
import {Router} from '@angular/router';

@Component({
    templateUrl: './create-task.component.html'
})
export class CreateTaskComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private tasksService: TasksService) {
    }

    submit(task: Task): void {
        this.tasksService.create(task).subscribe(
            (receivedTask: Task) => {
                this.responseSubject.complete();
                const url = 'employee/tasks/' + receivedTask.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
