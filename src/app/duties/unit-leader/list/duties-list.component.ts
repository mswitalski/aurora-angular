import {Component, OnInit} from '@angular/core';

import {AutoUnsubscriberComponent} from '../../../shared';
import {PagedResults} from '../../../shared/model/paged-results.model';
import {ActivatedRoute} from '@angular/router';
import {Duty} from '../../../shared/model/duty.model';
import {DutiesService} from '../../../shared/service/duties.service';
import {ListEventData} from '../../../shared/model/list-event-data.model';

@Component({
    templateUrl: './duties-list.component.html'
})
export class DutiesListComponent extends AutoUnsubscriberComponent implements OnInit {

    pagedResults: PagedResults<Duty>;
    dutiesList: Duty[];

    constructor(private route: ActivatedRoute, private dutiesService: DutiesService) {
        super();
    }

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: { pagedResults: PagedResults<Duty> }) => {
                this.dutiesList = data.pagedResults.content;
                this.pagedResults = data.pagedResults;
            }
        );
    }

    loadListData(eventData: ListEventData): void {
        if (eventData.isFilteringEnabled) {
            this.dutiesService.search(eventData.formData, eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.dutiesService.getAllByPage(eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<Duty>): void {
        this.dutiesList = data.content;
        this.pagedResults = data;
    }
}
