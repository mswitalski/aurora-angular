import {Component, OnInit} from '@angular/core';
import {Task} from '../../../shared';
import {TasksService} from '../../../shared/service';
import {ActivatedRoute} from '@angular/router';
import {ListEventData, PagedResults, TasksStatistics} from '../../../shared/model';

@Component({
    templateUrl: './tasks-list.component.html'
})
export class TasksListComponent implements OnInit {

    donePagedResults: PagedResults<Task>;
    doneTasksList: Task[];
    statistics: TasksStatistics;
    undoneTasksList: Task[];

    constructor(private route: ActivatedRoute, private tasksService: TasksService) {
    }

    ngOnInit(): void {
        this.undoneTasksList = this.route.snapshot.data['undoneTasks'];
        this.donePagedResults = this.route.snapshot.data['donePagedResults'];
        this.doneTasksList = this.donePagedResults.content;
        this.statistics = this.route.snapshot.data['statistics'];
    }

    loadListData(eventData: ListEventData): void {
        this.tasksService.findDoneAsUnitLeader(this.route.snapshot.params['userId'], eventData.page).subscribe(
            data => {
                this.doneTasksList = data.content;
                this.donePagedResults = data;
            });
    }
}
