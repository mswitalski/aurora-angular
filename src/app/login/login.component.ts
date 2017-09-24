import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';

import {AuthService} from '../shared/service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy {

    isBadCredentials = false;
    isSubmitting = false;
    isTimeout = false;
    loginForm: FormGroup;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private response: HttpResponse<any>;

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private router: Router) {
        this.createFormControls();
    }

    private createFormControls() {
        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    submitForm() {
        const credentials = this.loginForm.value;
        this.isBadCredentials = false;
        this.isSubmitting = true;
        this.isTimeout = false;

        this.authService.attemptAuthentication(credentials).takeUntil(this.ngUnsubscribe).subscribe(
            result => {
                this.isSubmitting = false;
                this.response = result;
            },
            err => {
                this.isSubmitting = false;
                this.handleErrorResponse(err.status);
            }
        );

        this.authService.isAuthenticated.takeUntil(this.ngUnsubscribe).subscribe(
            (isAuthenticated) => {
                if (isAuthenticated) {
                    this.router.navigate(['/dashboard']);
                }
            });
    }

    private handleErrorResponse(statusCode: number) {
        switch (statusCode) {
            case 0: {
                this.isTimeout = true;
                break;
            }
            case 401: {
                this.isBadCredentials = true;
                break;
            }
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
