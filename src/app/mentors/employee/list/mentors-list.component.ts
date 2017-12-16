import {AutoUnsubscriberComponent} from '../../../shared';
import {Component, OnInit} from '@angular/core';
import {ListEventData, Mentor, PagedResults} from '../../../shared/model';
import {ActivatedRoute} from '@angular/router';
import {MentorsService} from '../../../shared/service';

@Component({
    templateUrl: './mentors-list.component.html'
})
export class MentorsListComponent extends AutoUnsubscriberComponent implements OnInit {

    pagedResults: PagedResults<Mentor>;
    mentorsList: Mentor[];
    myMentorsList: Mentor[];

    constructor(private route: ActivatedRoute, private mentorsService: MentorsService) {
        super();
    }

    ngOnInit(): void {
        this.pagedResults = this.route.snapshot.data['pagedResults'];
        this.mentorsList = this.pagedResults.content;
        this.myMentorsList = this.route.snapshot.data['myMentors'];
    }

    loadListData(eventData: ListEventData): void {
        if (eventData.isFilteringEnabled) {
            this.mentorsService.searchAsEmployee(eventData.formData, eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.mentorsService.getAllByPageAsEmployee(eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<Mentor>): void {
        this.mentorsList = data.content;
        this.pagedResults = data;
    }
}
