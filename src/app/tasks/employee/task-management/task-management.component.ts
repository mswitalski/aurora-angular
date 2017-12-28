import {Component, OnInit} from '@angular/core';
import {Task} from '../../../shared/model';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksService} from '../../../shared/service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './task-management.component.html'
})
export class TaskManagementComponent implements OnInit {

    selectedTask: Task;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private tasksService: TasksService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.selectedTask = this.route.snapshot.data['task'];
        this.translate.get('DIALOG.CONFIRMATION').subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteTask(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.tasksService.delete(this.selectedTask).subscribe(
                () => this.router.navigate(['/employee/tasks'])
            );
        }
    }

    setAsDone(): void {
        const todayDate = new Date();
        this.selectedTask.doneDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();

        this.tasksService.update(this.selectedTask).subscribe(
            () => this.router.navigate(['/employee/tasks'])
        );
    }
}
