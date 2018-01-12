import {Task} from './task.model';

export class DateGroup {
    date: string;
    tasks: Task[] = [];

    constructor(date: string = null, task: Task = null) {
        this.date = date;

        if (task !== null) {
            this.tasks.push(task);
        }
    }

    addTask(task: Task): void {
        this.tasks.push(task);
    }
}
