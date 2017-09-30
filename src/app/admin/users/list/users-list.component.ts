import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../shared/model/user.model';
import 'rxjs/add/operator/takeUntil';
import {PagedResults} from '../../../shared/model/paged-results.model';
import {UsersService} from '../../../shared/service/users.service';

@Component({
    templateUrl: 'users-list.component.html'
})

export class UsersListComponent implements OnInit, OnDestroy {

    usersList: User[];
    activePage: number;
    totalPages: number;
    numberOfUsers: number;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private usersService: UsersService) {
    }

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: { pagedResults: PagedResults<User> }) => {
                this.processResponse(data.pagedResults);
            }
        );
    }

    private processResponse(response: PagedResults<User>) {
        this.usersList = response.content;
        this.activePage = response.number;
        this.totalPages = response.totalPages;
        this.numberOfUsers = response.numberOfElements;
    }

    firstPage() {
        this.activePage = 0;
        this.getUsersByActivePage();
    }

    lastPage() {
        this.activePage = this.totalPages - 1;
        this.getUsersByActivePage();
    }

    previousPage() {
        if (this.activePage !== 0) {
            this.activePage--;
            this.getUsersByActivePage();
        }
    }

    private getUsersByActivePage() {
        this.usersService.getAllByPage(this.activePage).takeUntil(this.ngUnsubscribe).subscribe(
            (data) => {
                this.processResponse(data);
            });
    }

    nextPage() {
        if (this.activePage + 1 < this.totalPages) {
            this.activePage++;
            this.getUsersByActivePage();
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
