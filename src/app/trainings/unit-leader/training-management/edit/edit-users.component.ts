import {Component, OnInit} from '@angular/core';
import {DataCheckbox, Training, User} from '../../../../shared/model';
import {ActivatedRoute, Router} from '@angular/router';
import {OutlookService, TrainingsService} from '../../../../shared/service';

@Component({
    templateUrl: './edit-users.component.html'
})
export class EditUsersComponent implements OnInit {

    usersCheckboxes: DataCheckbox<User>[] = [];
    isSubmitting = false;
    training: Training;
    isOutlookLogged: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private trainingsService: TrainingsService,
                private outlookService: OutlookService) {
        this.outlookService.isTokenPresent.subscribe(v => this.isOutlookLogged = v);
    }

    ngOnInit(): void {
        this.training = this.route.snapshot.data['training'];
        this.route.snapshot.data['users'].forEach(
            user => this.usersCheckboxes.push(new DataCheckbox(user, this.hasUser(user)))
        );
    }

    hasUser(user: User): boolean {
        return this.training.users.findIndex(u => u.id === user.id) !== -1;
    }

    submitUsers() {
        this.training.users = this.usersCheckboxes.filter(c => c.value).map(c => c.item);
        this.trainingsService.update(this.training).subscribe(
            () => {
                const url = 'unitleader/trainings/' + this.training.id;
                this.router.navigate([url]);
            },
            error => {
                this.router.navigate(['/error/' + error.status], {skipLocationChange: true});
            }
        );
    }
}
