import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {PagedResults, User, UserSearchForm} from '../../../shared/model';
import {UsersService} from '../../../shared/service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AutoUnsubscriberComponent} from '../../../shared';

@Component({
    templateUrl: 'users-list.component.html'
})
export class UsersListComponent extends AutoUnsubscriberComponent implements OnInit {

    formData = new UserSearchForm();
    pagedResults: PagedResults<User>;
    searchUserForm: FormGroup;
    usersList: User[];
    private isFilteringEnabled = false;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private usersService: UsersService) {
        super();
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

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: { pagedResults: PagedResults<User> }) => {
                this.usersList = data.pagedResults.content;
                this.pagedResults = data.pagedResults;
            }
        );
    }

    loadPage(activePage: number): void {
        if (this.isFilteringEnabled) {
            this.usersService.search(this.formData, activePage).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.usersService.getAllByPage(activePage).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<User>): void {
        this.usersList = data.content;
        this.pagedResults = data;
    }

    resetSearchForm(): void {
        this.isFilteringEnabled = false;
        this.searchUserForm.reset(new UserSearchForm());
        this.loadPage(0);
    }

    search(): void {
        this.isFilteringEnabled = true;
        this.loadPage(0);
    }
}
