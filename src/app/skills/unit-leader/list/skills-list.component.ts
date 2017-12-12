import {Component, OnInit} from '@angular/core';
import {AutoUnsubscriberComponent} from '../../../shared/auto-unsubscriber.component';
import {Skill} from '../../../shared/model/skill.model';
import {PagedResults} from '../../../shared/model/paged-results.model';
import {ActivatedRoute} from '@angular/router';
import {SkillsService} from '../../../shared/service/skills.service';
import {ListEventData} from '../../../shared/model/list-event-data.model';

@Component({
    templateUrl: './skills-list.component.html'
})
export class SkillsListComponent extends AutoUnsubscriberComponent implements OnInit {

    pagedResults: PagedResults<Skill>;
    skillsList: Skill[];

    constructor(private route: ActivatedRoute, private skillsService: SkillsService) {
        super();
    }

    ngOnInit(): void {
        this.pagedResults = this.route.snapshot.data['pagedResults'];
        this.skillsList = this.pagedResults.content;
    }

    loadListData(eventData: ListEventData): void {
        if (eventData.isFilteringEnabled) {
            this.skillsService.search(eventData.formData, eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.skillsService.getAllByPage(eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<Skill>): void {
        this.skillsList = data.content;
        this.pagedResults = data;
    }
}
