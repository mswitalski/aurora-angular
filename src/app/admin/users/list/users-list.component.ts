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
    pagedResults: PagedResults<User>;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private usersService: UsersService) {
    }

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: { pagedResults: PagedResults<User> }) => {
                this.usersList = data.pagedResults.content;
                this.pagedResults = data.pagedResults;
            }
        );
    }

    pageChanged(activePage: number) {
        this.usersService.getAllByPage(activePage).takeUntil(this.ngUnsubscribe).subscribe(
            (data) => {
                this.usersList = data.content;
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
