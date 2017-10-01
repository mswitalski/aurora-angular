import {Component, Input} from '@angular/core';
import {User} from '../model/user.model';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html'
})

export class UserDetailsComponent {

    selectedUser: User;
    extendedInformation = false;

    @Input() set user(user: User) {
        this.selectedUser = user;
    }

    @Input() set extendedInfo(value: boolean) {
        this.extendedInformation = value;
    }
}
