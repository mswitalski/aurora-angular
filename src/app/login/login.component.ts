import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../shared/service/auth.service';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
    isSubmitting = false;
    loginForm: FormGroup;
    isBadCredentials = false;
    isTimeout = false;
    private response: HttpResponse<any>;
    private attemptSubscription: Subscription;
    private isAuthenticatedSubscription: Subscription;

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

        this.attemptSubscription = this.authService.attemptAuthentication(credentials).subscribe(
            result => {
                this.response = result;
            },
            err => {
                switch (err.status) {
                    case 0: { this.isTimeout = true; break; }
                    case 401: { this.isBadCredentials = true; break; }
                }
            }
        );

        this.isAuthenticatedSubscription = this.authService.isAuthenticated.subscribe(
            (isAuthenticated) => {
                this.isSubmitting = false;
                if (isAuthenticated) {
                    this.processResponse();
                    this.router.navigate(['/dashboard']);
                }
            });
    }

    private processResponse() {
        switch (this.response.status) {
            case 401: {
                this.isBadCredentials = true;
                break;
            }
            case 0: {
                this.isTimeout = true;
                break;
            }
        }

        this.isSubmitting = false;
    }

    ngOnDestroy() {
        this.attemptSubscription.unsubscribe();
        this.isAuthenticatedSubscription.unsubscribe();
    }
}
