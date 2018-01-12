import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {ListEventData, PagedResults, User} from '../../../msh/model';
import {UsersService} from '../../../msh/service';

@Component({
    templateUrl: 'users-list.component.html'
})
export class UsersListComponent implements OnInit {

    pagedResults: PagedResults<User>;
    usersList: User[];

    constructor(private route: ActivatedRoute, private usersService: UsersService) {
    }

    ngOnInit() {
        this.pagedResults = this.route.snapshot.data['pagedResults'];
        this.usersList = this.pagedResults.content;
    }

    loadListData(eventData: ListEventData): void {
        if (eventData.isFilteringEnabled) {
            this.usersService.search(eventData.formData, eventData.page).subscribe(
                data => this.processReceivedData(data));

        } else {
            this.usersService.getAllByPage(eventData.page).subscribe(
                data => this.processReceivedData(data));
        }
    }

    private processReceivedData(data: PagedResults<User>): void {
        this.usersList = data.content;
        this.pagedResults = data;
    }
}
