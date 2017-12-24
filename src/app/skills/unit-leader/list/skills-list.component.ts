import {Component, OnInit} from '@angular/core';
import {ListEventData, PagedResults, Skill} from '../../../shared/model';
import {ActivatedRoute} from '@angular/router';
import {SkillsService} from '../../../shared/service';

@Component({
    templateUrl: './skills-list.component.html'
})
export class SkillsListComponent implements OnInit {

    pagedResults: PagedResults<Skill>;
    skillsList: Skill[];

    constructor(private route: ActivatedRoute, private skillsService: SkillsService) {
    }

    ngOnInit(): void {
        this.pagedResults = this.route.snapshot.data['pagedResults'];
        this.skillsList = this.pagedResults.content;
    }

    loadListData(eventData: ListEventData): void {
        if (eventData.isFilteringEnabled) {
            this.skillsService.search(eventData.formData, eventData.page).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.skillsService.getAllByPage(eventData.page).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<Skill>): void {
        this.skillsList = data.content;
        this.pagedResults = data;
    }
}
