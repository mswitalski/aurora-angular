import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {TasksService} from '../../../../shared/service';
import {HttpErrorResponse} from '@angular/common/http';
import {Task} from '../../../../shared/model';
import {ObjectsUtil} from '../../../../shared/util';

@Component({
    templateUrl: './edit-task.component.html'
})
export class EditTaskComponent implements OnInit {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);
    task: Task;

    constructor(private route: ActivatedRoute, private router: Router, private tasksService: TasksService) {
    }

    ngOnInit(): void {
        this.task = ObjectsUtil.clone(this.route.snapshot.data['task']);
    }

    submit(task: Task): void {
        this.tasksService.update(task).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'employee/tasks/' + task.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
