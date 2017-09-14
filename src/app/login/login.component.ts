import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    loginForm: FormGroup;
    isSubmitting = false;

    constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }
}
