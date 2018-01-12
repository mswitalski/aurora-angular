import {Component, OnInit} from '@angular/core';
import {Task} from '../../../msh/model';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksService} from '../../../msh/service';
import {TranslateService} from '@ngx-translate/core';
import {DatesUtil} from '../../../msh/util';

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
        this.selectedTask.doneDate = DatesUtil.formatDate(new Date());
        this.tasksService.update(this.selectedTask).subscribe(
            () => this.router.navigate(['/employee/tasks'])
        );
    }
}
