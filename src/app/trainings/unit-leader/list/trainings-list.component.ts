import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../../shared';
import {ListEventData, PagedResults, Training} from '../../../shared/model';
import {TrainingsService} from '../../../shared/service';

@Component({
    templateUrl: 'trainings-list.component.html'
})
export class TrainingsListComponent extends AutoUnsubscriberComponent implements OnInit {

    pagedResults: PagedResults<Training>;
    trainingsList: Training[];

    constructor(private route: ActivatedRoute, private trainingsService: TrainingsService) {
        super();
    }

    ngOnInit() {
        this.pagedResults = this.route.snapshot.data['pagedResults'];
        this.trainingsList = this.pagedResults.content;
    }

    loadListData(eventData: ListEventData): void {
        if (eventData.isFilteringEnabled) {
            this.trainingsService.search(eventData.formData, eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.trainingsService.getAllByPage(eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<Training>): void {
        this.trainingsList = data.content;
        this.pagedResults = data;
    }
}
