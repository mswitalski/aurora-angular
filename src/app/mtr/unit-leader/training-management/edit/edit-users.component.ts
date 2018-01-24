import {Component, OnInit} from '@angular/core';
import {DataCheckbox, Training, User} from '../../../../msh/model';
import {ActivatedRoute, Router} from '@angular/router';
import {OutlookService, TrainingsService} from '../../../../msh/service';
import {ObjectsUtil} from '../../../../msh/util';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    templateUrl: './edit-users.component.html'
})
export class EditUsersComponent implements OnInit {

    isOutlookLogged: boolean;
    isSubmitting = false;
    training: Training;
    usersCheckboxes: DataCheckbox<User>[] = [];
    selectedCheckboxes = 0;
    serverResponse: HttpErrorResponse;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private trainingsService: TrainingsService,
                private outlookService: OutlookService) {
        this.outlookService.isTokenPresent.subscribe(v => this.isOutlookLogged = v);
    }

    ngOnInit(): void {
        this.training = ObjectsUtil.clone(this.route.snapshot.data['training']);
        this.route.snapshot.data['users'].forEach(
            user => this.usersCheckboxes.push(new DataCheckbox(user, this.hasUser(user)))
        );
        this.selectedCheckboxes = this.training.users.length;
    }

    modifyCount(v: boolean): void {
        if (v) {
            this.selectedCheckboxes++;

        } else {
            this.selectedCheckboxes--;
        }
    }

    hasUser(user: User): boolean {
        return this.training.users.findIndex(u => u.id === user.id) !== -1;
    }

    submitUsers() {
        this.training.users = this.usersCheckboxes.filter(c => c.value).map(c => c.item);
        this.isSubmitting = true;
        this.trainingsService.update(this.training).subscribe(
            () => {
                const url = 'unitleader/trainings/' + this.training.id;
                this.router.navigate([url]);
            },
            error => {
                if (error.status === 400) {
                    this.serverResponse = error.error;
                }

                this.isSubmitting = false;
            }
        );
    }
}
