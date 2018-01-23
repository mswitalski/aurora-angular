import {Component, Input} from '@angular/core';
import {DateGroup, Task} from '../../../msh/model';

@Component({
    selector: 'app-undone-tasks-list',
    templateUrl: './undone-tasks-list.component.html'
})
export class UndoneTasksListComponent {

    actionButton = true;
    dateGroups: DateGroup[] = [];
    tasksPresent = false;
    private tasksList: Task[];

    @Input() set listData(data: Task[]) {
        this.tasksList = data;

        if (this.tasksList.length > 0) {
            this.prepareDateGroups();
        }
    }

    @Input() set showActionButton(flag: boolean) {
        this.actionButton = flag;
    }

    private prepareDateGroups(): void {
        this.dateGroups.push(new DateGroup('overdue'));
        this.dateGroups.push(new DateGroup('undated'));

        this.tasksList.forEach(task => {
            this.tasksPresent = true;

            if (task.deadlineDate === null || task.deadlineDate === undefined) {
                this.dateGroups.find(g => g.date === 'undated').addTask(task);

            } else {
                this.assignDatedTaskToGroup(task);
            }
        });
    }

    private assignDatedTaskToGroup(task: Task): void {
        const nowDate = new Date();
        nowDate.setHours(0, 0, 0, 0);
        const taskDate = new Date(task.deadlineDate);
        taskDate.setHours(0, 0, 0, 0);

        if (taskDate < nowDate) {
            this.dateGroups.find(g => g.date === 'overdue').addTask(task);

        } else {
            const group = this.dateGroups.find(g => g.date === task.deadlineDate);

            if (group === undefined) {
                this.dateGroups.push(new DateGroup(task.deadlineDate, task));

            } else {
                group.addTask(task);
            }
        }
    }
}
