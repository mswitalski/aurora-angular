import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {PagedResults} from '../../../shared/model';
import {Duty, DutySearchForm, ListEventData} from '../../../shared/model';

@Component({
    selector: 'app-duties-basic-list',
    templateUrl: './duties-basic-list.component.html'
})
export class DutiesBasicListComponent {

    formData = new DutySearchForm();
    isFilteringEnabled = false;
    pagedResults: PagedResults<Duty>;
    searchDutyForm: FormGroup;
    dutiesList: Duty[];

    @Output()
    userInteracted: EventEmitter<ListEventData> = new EventEmitter();

    @Input() set paginationData(data: PagedResults<any>) {
        this.pagedResults = data;
    }

    @Input() set listData(data: Duty[]) {
        this.dutiesList = data;
    }

    constructor(private formBuilder: FormBuilder) {
        this.createFormControls();
    }

    private createFormControls(): void {
        this.searchDutyForm = this.formBuilder.group({
            'name': ['']
        });
    }

    loadPage(activePage: number): void {
        const eventData = new ListEventData(activePage, this.isFilteringEnabled, this.formData);
        this.userInteracted.emit(eventData);
    }

    resetSearchForm(): void {
        this.isFilteringEnabled = false;
        this.searchDutyForm.reset(new DutySearchForm());
        const eventData = new ListEventData(0, false);
        this.userInteracted.emit(eventData);
    }

    search(): void {
        this.isFilteringEnabled = true;
        const eventData = new ListEventData(0, true, this.formData);
        this.userInteracted.emit(eventData);
    }
}
