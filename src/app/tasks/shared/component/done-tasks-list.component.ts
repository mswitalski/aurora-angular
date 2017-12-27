import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListEventData, PagedResults, Task} from '../../../shared/model';

@Component({
    selector: 'app-done-tasks-list',
    templateUrl: './done-tasks-list.component.html'
})
export class DoneTasksListComponent {

    pagedResults: PagedResults<Task>;
    tasksList: Task[];

    @Output()
    userInteracted: EventEmitter<ListEventData> = new EventEmitter();

    @Input() set paginationData(data: PagedResults<any>) {
        this.pagedResults = data;
    }

    @Input() set listData(data: Task[]) {
        this.tasksList = data;
    }

    loadPage(activePage: number): void {
        const eventData = new ListEventData(activePage);
        this.userInteracted.emit(eventData);
    }
}
