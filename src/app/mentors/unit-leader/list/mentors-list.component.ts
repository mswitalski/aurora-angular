import {Component, OnInit} from '@angular/core';
import {ListEventData, Mentor, PagedResults} from '../../../shared/model';
import {ActivatedRoute} from '@angular/router';
import {MentorsService} from '../../../shared/service';

@Component({
    templateUrl: './mentors-list.component.html'
})
export class MentorsListComponent implements OnInit {

    mentorsList: Mentor[];
    pagedResults: PagedResults<Mentor>;

    constructor(private route: ActivatedRoute, private mentorsService: MentorsService) {
    }

    ngOnInit(): void {
        this.pagedResults = this.route.snapshot.data['pagedResults'];
        this.mentorsList = this.pagedResults.content;
    }

    loadListData(eventData: ListEventData): void {
        if (eventData.isFilteringEnabled) {
            this.mentorsService.searchAsUnitLeader(eventData.formData, eventData.page).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.mentorsService.getAllByPageAsUnitLeader(eventData.page).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<Mentor>): void {
        this.mentorsList = data.content;
        this.pagedResults = data;
    }
}
