import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {UserSearchForm} from '../../../shared/model';
import {PagedResults} from '../../../shared/model';
import {User} from '../../../shared/model';
import {ListEventData} from '../../../shared/model/list-event-data.model';

@Component({
    selector: 'app-expanded-users-list',
    templateUrl: './expanded-users-list.component.html'
})
export class ExpandedUsersListComponent {

    formData = new UserSearchForm();
    isFilteringEnabled = false;
    pagedResults: PagedResults<User>;
    searchUserForm: FormGroup;
    usersList: User[];

    @Output()
    userInteracted: EventEmitter<ListEventData> = new EventEmitter();

    @Input() set paginationData(data: PagedResults<any>) {
        this.pagedResults = data;
    }

    @Input() set listData(data: User[]) {
        this.usersList = data;
    }

    constructor(private formBuilder: FormBuilder) {
        this.createFormControls();
    }

    private createFormControls(): void {
        this.searchUserForm = this.formBuilder.group({
            'username': [''],
            'name': [''],
            'surname': [''],
            'email': ['']
        });
    }

    loadPage(activePage: number): void {
        const eventData = new ListEventData(activePage, this.isFilteringEnabled, this.formData);
        this.userInteracted.emit(eventData);
    }

    resetSearchForm(): void {
        this.isFilteringEnabled = false;
        this.searchUserForm.reset(new UserSearchForm());
        const eventData = new ListEventData(0, false);
        this.userInteracted.emit(eventData);
    }

    search(): void {
        this.isFilteringEnabled = true;
        const eventData = new ListEventData(0, true, this.formData);
        this.userInteracted.emit(eventData);
    }
}
