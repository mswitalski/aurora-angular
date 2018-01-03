import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListEventData, PagedResults, Training, TrainingSearchForm} from '../../../shared/model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-trainings-list',
    templateUrl: './trainings-list.component.html'
})
export class TrainingsListComponent {

    formData = new TrainingSearchForm();
    isFilteringEnabled = false;
    pagedResults: PagedResults<Training>;
    searchTrainingForm: FormGroup;
    showSearch = true;
    trainingsList: Training[];

    @Output()
    userInteracted: EventEmitter<ListEventData> = new EventEmitter();

    @Input() set paginationData(data: PagedResults<any>) {
        this.pagedResults = data;
    }

    @Input() set listData(data: Training[]) {
        this.trainingsList = data;
    }

    @Input() set visibleSearch(flag: boolean) {
        this.showSearch = flag;
    }

    constructor(private formBuilder: FormBuilder) {
        this.searchTrainingForm = this.formBuilder.group({
            'name': [''],
            'type': [''],
            'location': ['']
        });
    }

    loadPage(activePage: number): void {
        const eventData = new ListEventData(activePage, this.isFilteringEnabled, this.formData);
        this.userInteracted.emit(eventData);
    }

    resetSearchForm(): void {
        this.isFilteringEnabled = false;
        this.searchTrainingForm.reset(new TrainingSearchForm());
        const eventData = new ListEventData(0, false);
        this.userInteracted.emit(eventData);
    }

    search(): void {
        this.isFilteringEnabled = true;
        const eventData = new ListEventData(0, true, this.formData);
        this.userInteracted.emit(eventData);
    }
}
