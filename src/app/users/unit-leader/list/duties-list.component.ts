import {Component, OnInit} from '@angular/core';
import {Duty, DutySearchForm, PagedResults} from '../../../shared/model';
import {ActivatedRoute} from '@angular/router';
import {DutiesService} from '../../../shared/service';
import {FormGroup} from '@angular/forms/src/model';
import {FormBuilder} from '@angular/forms';

@Component({
    templateUrl: './duties-list.component.html'
})
export class DutiesListComponent implements OnInit {

    dutiesList: Duty[];
    formData = new DutySearchForm();
    isFilteringEnabled = false;
    pagedResults: PagedResults<Duty>;
    searchDutyForm: FormGroup;

    constructor(private route: ActivatedRoute, private dutiesService: DutiesService, private formBuilder: FormBuilder) {
        this.searchDutyForm = this.formBuilder.group({
            'name': ['']
        });
    }

    ngOnInit() {
        this.pagedResults = this.route.snapshot.data['pagedResults'];
        this.dutiesList = this.pagedResults.content;
    }

    loadPage(activePage: number): void {
        if (this.isFilteringEnabled) {
            this.dutiesService.search(this.formData, activePage).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.dutiesService.getAllByPage(activePage).subscribe(
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
