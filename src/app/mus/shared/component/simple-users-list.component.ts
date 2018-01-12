import {Component, Input} from '@angular/core';
import {User} from '../../../msh/model';

@Component({
    selector: 'app-simple-users-list',
    templateUrl: './simple-users-list.component.html'
})
export class SimpleUsersListComponent {

    usersList: User[];

    @Input() set listData(data: User[]) {
        this.usersList = data;
    }
}
