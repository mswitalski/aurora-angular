import {Component, Input} from '@angular/core';
import {User} from '../model/user.model';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html'
})

export class UserDetailsComponent {

    selectedUser: User;

    @Input() set user(user: User) {
        this.selectedUser = user;
    }
}
