import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../../shared';
import {ListEventData, PagedResults, User} from '../../../shared/model';
import {UsersService} from '../../../shared/service';

@Component({
    templateUrl: 'users-list.component.html'
})
export class UsersListComponent extends AutoUnsubscriberComponent implements OnInit {

    pagedResults: PagedResults<User>;
    usersList: User[];

    constructor(private route: ActivatedRoute, private usersService: UsersService) {
        super();
    }

    ngOnInit() {
        this.route.data.takeUntil(this.ngUnsubscribe).subscribe(
            (data: { pagedResults: PagedResults<User> }) => {
                this.usersList = data.pagedResults.content;
                this.pagedResults = data.pagedResults;
            }
        );
    }

    loadListData(eventData: ListEventData): void {
        if (eventData.isFilteringEnabled) {
            this.usersService.search(eventData.formData, eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.usersService.getAllByPage(eventData.page).takeUntil(this.ngUnsubscribe).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<User>): void {
        this.usersList = data.content;
        this.pagedResults = data;
    }
}
