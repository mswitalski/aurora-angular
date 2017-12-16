import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListEventData, Mentor, MentorSearchForm, PagedResults} from '../../../shared/model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-mentors-list',
    templateUrl: './mentors-list.component.html'
})
export class MentorsListComponent {

    formData = new MentorSearchForm();
    isFilteringEnabled = false;
    pagedResults: PagedResults<Mentor>;
    searchMentorForm: FormGroup;
    mentorsList: Mentor[];
    extendedInformation = false;

    @Output()
    userInteracted: EventEmitter<ListEventData> = new EventEmitter();

    @Input() set paginationData(data: PagedResults<any>) {
        this.pagedResults = data;
    }

    @Input() set extendedInfo(value: boolean) {
        this.extendedInformation = value;
    }

    @Input() set listData(data: Mentor[]) {
        this.mentorsList = data;
    }

    constructor(private formBuilder: FormBuilder) {
        this.searchMentorForm = this.formBuilder.group({'name': ['']});
    }

    loadPage(activePage: number): void {
        const eventData = new ListEventData(activePage, this.isFilteringEnabled, this.formData);
        this.userInteracted.emit(eventData);
    }

    resetSearchForm(): void {
        this.isFilteringEnabled = false;
        this.searchMentorForm.reset(new MentorSearchForm());
        const eventData = new ListEventData(0, false);
        this.userInteracted.emit(eventData);
    }

    search(): void {
        this.isFilteringEnabled = true;
        const eventData = new ListEventData(0, true, this.formData);
        this.userInteracted.emit(eventData);
    }
}
