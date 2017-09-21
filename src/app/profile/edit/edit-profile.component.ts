import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UsersService} from '../../shared/service/users.service';

@Component({
    templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit, OnDestroy {

    editProfileForm: FormGroup;
    isSubmitting = false;
    loggedUser: User;
    private routeDataSubscription: Subscription;
    private updateSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usersService: UsersService) {
        this.editProfileForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'name': ['', Validators.required],
            'surname': ['', Validators.required],
            'position': ['', Validators.required],
            'goals': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.routeDataSubscription = this.route.data.subscribe(
            (data: {user: User}) => {
                this.loggedUser = data.user;
            }
        );
    }

    submitForm() {
        this.isSubmitting = true;
        this.updateSubscription = this.usersService.update(this.loggedUser).subscribe(
            () => {
                this.router.navigate(['/profile']);
                this.isSubmitting = false;
            }
        );
    }

    ngOnDestroy() {
        if (this.routeDataSubscription) {
            this.routeDataSubscription.unsubscribe();
        }
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
    }
}
