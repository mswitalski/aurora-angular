import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Errors} from '../shared/model/errors.model';
import {AuthService} from '../shared/service/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    errors: Errors;
    isSubmitting = false;
    loginForm: FormGroup;
    isBadCredentials = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    submitForm() {
        this.isSubmitting = true;
        this.isBadCredentials = false;
        this.errors = new Errors();
        const credentials = this.loginForm.value;

        this.authService.attemptAuthentication(credentials).subscribe(
            data => this.router.navigateByUrl('/'),
            (err: Response) => {
                if (err.status === 401) {
                    this.isBadCredentials = true;
                }

                this.isSubmitting = false;
            }
        );
    }
}