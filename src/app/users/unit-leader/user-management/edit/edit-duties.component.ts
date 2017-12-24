import {Component, OnInit} from '@angular/core';
import {DataCheckbox, Duty, User} from '../../../../shared/model';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../../shared/service';

@Component({
    templateUrl: './edit-duties.component.html'
})
export class EditDutiesComponent implements OnInit {

    dutiesCheckboxes: DataCheckbox<Duty>[] = [];
    isSubmitting = false;
    user: User;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(JSON.stringify(this.route.snapshot.data['user']));
        this.route.snapshot.data['duties'].forEach(
            role => this.dutiesCheckboxes.push(new DataCheckbox(role, this.hasRole(role)))
        );
    }

    hasRole(duty: Duty): boolean {
        return this.user.duties.findIndex(d => d.id === duty.id) !== -1;
    }

    submit() {
        this.user.duties = this.dutiesCheckboxes.filter(c => c.value).map(c => c.item);
        this.usersService.updateDuties(this.user).subscribe(
            () => {
                const url = 'unitleader/users/' + this.user.id;
                this.router.navigate([url]);
            },
            error => {
                this.router.navigate(['/error/' + error.status], {skipLocationChange: true});
            }
        );
    }
}
