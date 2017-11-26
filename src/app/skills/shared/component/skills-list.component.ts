import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ListEventData, PagedResults, Skill, SkillSearchForm} from '../../../shared/model';

@Component({
    selector: 'app-skills-list',
    templateUrl: './skills-list.component.html'
})
export class SkillsListComponent {

    searchFormData = new SkillSearchForm();
    isFilteringEnabled = false;
    pagedResults: PagedResults<Skill>;
    searchSkillForm: FormGroup;
    skillsList: Skill[];

    @Output()
    userInteracted: EventEmitter<ListEventData> = new EventEmitter();

    @Input() set paginationData(data: PagedResults<any>) {
        this.pagedResults = data;
    }

    @Input() set listData(data: Skill[]) {
        this.skillsList = data;
    }

    constructor(private formBuilder: FormBuilder) {
        this.createFormControls();
    }

    private createFormControls(): void {
        this.searchSkillForm = this.formBuilder.group({
            'name': ['']
        });
    }

    loadPage(activePage: number): void {
        const eventData = new ListEventData(activePage, this.isFilteringEnabled, this.searchFormData);
        this.userInteracted.emit(eventData);
    }

    resetSearchForm(): void {
        this.isFilteringEnabled = false;
        this.searchSkillForm.reset(new SkillSearchForm());
        const eventData = new ListEventData(0, false);
        this.userInteracted.emit(eventData);
    }

    search(): void {
        this.isFilteringEnabled = true;
        const eventData = new ListEventData(0, true, this.searchFormData);
        this.userInteracted.emit(eventData);
    }
}
