import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../shared/service/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    isSubmitting = false;
    loginForm: FormGroup;
    isBadCredentials = false;
    isTimeout = false;

    constructor(private authService: AuthService,
                private router: Router,
                private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    submitForm() {
        this.isSubmitting = true;
        this.isBadCredentials = false;
        this.isTimeout = false;
        const credentials = this.loginForm.value;

        this.authService.attemptAuthentication(credentials).subscribe(
            () => {
                setTimeout(() => {
                    this.router.navigate(['/dashboard']);
                }, 50);

            },
            (err) => {
                if (err.status === 401) {
                    this.isBadCredentials = true;

                } else if (err.status === 0) {
                    this.isTimeout = true;
                }

                this.isSubmitting = false;
            }
        );
    }
}
