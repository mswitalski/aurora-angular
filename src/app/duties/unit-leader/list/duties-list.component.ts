import {Component, OnInit} from '@angular/core';

import {AutoUnsubscriberComponent} from '../../../shared';
import {PagedResults} from '../../../shared/model/paged-results.model';
import {ActivatedRoute} from '@angular/router';
import {Duty} from '../../../shared/model/duty.model';
import {DutiesService} from '../../../shared/service/duties.service';
import {FormGroup} from '@angular/forms/src/model';
import {DutySearchForm} from '../../../shared/model/duty-search-form.model';
import {FormBuilder} from '@angular/forms';

@Component({
    templateUrl: './duties-list.component.html'
})
export class DutiesListComponent extends AutoUnsubscriberComponent implements OnInit {

    dutiesList: Duty[];
    formData = new DutySearchForm();
    isFilteringEnabled = false;
    pagedResults: PagedResults<Duty>;
    searchDutyForm: FormGroup;

    constructor(private route: ActivatedRoute, private dutiesService: DutiesService, private formBuilder: FormBuilder) {
        super();
        this.createFormControls();
    }

    private createFormControls(): void {
        this.searchDutyForm = this.formBuilder.group({
            'name': ['']
        });
    }

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: { pagedResults: PagedResults<Duty> }) => {
                this.dutiesList = data.pagedResults.content;
                this.pagedResults = data.pagedResults;
            }
        );
    }

    loadPage(activePage: number): void {
        if (this.isFilteringEnabled) {
            this.dutiesService.search(this.formData, activePage).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.dutiesService.getAllByPage(activePage).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<Duty>): void {
        this.dutiesList = data.content;
        this.pagedResults = data;
    }

    resetSearchForm(): void {
        this.isFilteringEnabled = false;
        this.searchDutyForm.reset(new DutySearchForm());
        this.loadPage(0);
    }

    search(): void {
        this.isFilteringEnabled = true;
        this.loadPage(0);
    }
}
