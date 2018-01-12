import {ActivatedRoute} from '@angular/router';
import {ListEventData, PagedResults, Training} from '../../../msh/model';
import {TrainingsService} from '../../../msh/service';
import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: 'trainings-list.component.html'
})
export class TrainingsListComponent implements OnInit {

    finishedPagedResults: PagedResults<Training>;
    finishedTrainingsList: Training[];
    plannedPagedResults: PagedResults<Training>;
    plannedTrainingsList: Training[];

    constructor(private route: ActivatedRoute, private trainingsService: TrainingsService) {
    }

    ngOnInit() {
        this.finishedPagedResults = this.route.snapshot.data['finishedPagedResults'];
        this.finishedTrainingsList = this.finishedPagedResults.content;
        this.plannedPagedResults = this.route.snapshot.data['plannedPagedResults'];
        this.plannedTrainingsList = this.plannedPagedResults.content;
    }

    loadFinishedListData(eventData: ListEventData): void {
        this.trainingsService.getEmployeeFinishedByPage(eventData.page).subscribe(
            data => {
                this.finishedTrainingsList = data.content;
                this.finishedPagedResults = data;
            });
    }

    loadPlannedListData(eventData: ListEventData): void {
        this.trainingsService.getEmployeePlannedByPage(eventData.page).subscribe(
            data => {
                this.plannedTrainingsList = data.content;
                this.plannedPagedResults = data;
            });
    }
}
