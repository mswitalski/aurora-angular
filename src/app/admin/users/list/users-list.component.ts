import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {PagedResults, User, UserSearchForm} from '../../../shared/model';
import {UsersService} from '../../../shared/service/users.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    templateUrl: 'users-list.component.html'
})

export class UsersListComponent implements OnInit, OnDestroy {

    usersList: User[];
    formData = new UserSearchForm();
    searchUserForm: FormGroup;
    pagedResults: PagedResults<User>;
    private isFilteringEnabled = false;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private usersService: UsersService) {
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

    resetForm(): void {
        this.isFilteringEnabled = false;
        this.pageChanged(0);
        this.searchUserForm.reset(new UserSearchForm());
    }

    search(): void {
        this.isFilteringEnabled = true;
        this.pageChanged(0);
    }

    pageChanged(activePage: number): void {
        if (this.isFilteringEnabled) {
            this.usersService.search(this.formData, activePage).takeUntil(this.ngUnsubscribe).subscribe(
                (data) => {
                    this.usersList = data.content;
                    this.pagedResults = data;
                });

        } else {
            this.usersService.getAllByPage(activePage).takeUntil(this.ngUnsubscribe).subscribe(
                (data) => {
                    this.usersList = data.content;
                    this.pagedResults = data;
                });
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
