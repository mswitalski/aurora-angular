import {Component, Input} from '@angular/core';
import {User} from '../../../shared/model';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent {

    extendedInformation = false;
    selectedUser: User;

    @Input() set user(user: User) {
        this.selectedUser = user;
    }

    @Input() set extendedInfo(value: boolean) {
        this.extendedInformation = value;
    }

    getFormattedDuties(): string {
        return this.selectedUser.duties.map(d => d.name).join(', ');
    }
}
