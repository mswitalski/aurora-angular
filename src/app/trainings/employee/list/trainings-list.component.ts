import {ActivatedRoute} from '@angular/router';
import {ListEventData, PagedResults, Training} from '../../../shared/model';
import {TrainingsService} from '../../../shared/service';
import {Component, OnInit} from '@angular/core';
import {AutoUnsubscriberComponent} from '../../../shared';

@Component({
    templateUrl: 'trainings-list.component.html'
})
export class TrainingsListComponent extends AutoUnsubscriberComponent implements OnInit {

    finishedPagedResults: PagedResults<Training>;
    finishedTrainingsList: Training[];
    plannedPagedResults: PagedResults<Training>;
    plannedTrainingsList: Training[];

    constructor(private route: ActivatedRoute, private trainingsService: TrainingsService) {
        super();
    }

    ngOnInit() {
        this.finishedPagedResults = this.route.snapshot.data['finishedPagedResults'];
        this.finishedTrainingsList = this.finishedPagedResults.content;
        this.plannedPagedResults = this.route.snapshot.data['plannedPagedResults'];
        this.plannedTrainingsList = this.plannedPagedResults.content;
    }

    loadFinishedListData(eventData: ListEventData): void {
        this.trainingsService.getEmployeeFinishedByPage(eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
            data => {
                this.finishedTrainingsList = data.content;
                this.finishedPagedResults = data;
            });
    }

    loadPlannedListData(eventData: ListEventData): void {
        this.trainingsService.getEmployeePlannedByPage(eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
            data => {
                this.plannedTrainingsList = data.content;
                this.plannedPagedResults = data;
            });
    }
}
