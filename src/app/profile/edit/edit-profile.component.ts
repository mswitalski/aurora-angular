import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/model/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {

    editProfileForm: FormGroup;
    isSubmitting = false;
    loggedUser: User;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
        this.editProfileForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'name': ['', Validators.required],
            'surname': ['', Validators.required],
            'position': ['', Validators.required],
            'goals': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {user: User}) => {
                this.loggedUser = data.user;
            }
        );
    }

    submitForm() {

    }
}
