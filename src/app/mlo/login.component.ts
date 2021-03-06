import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {AuthService} from '../msh/service';
import {AutoUnsubscriberComponent} from '../msh';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends AutoUnsubscriberComponent implements OnDestroy, AfterViewInit {

    isBadCredentials = false;
    isSubmitting = false;
    isTimeout = false;
    loginForm: FormGroup;
    @ViewChild('sidebar') sidebar: ElementRef;

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private router: Router) {
        super();

        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    ngAfterViewInit(): void {
        document.getElementById('content').classList.add('w-100');
        document.getElementById('wrapper').classList.remove('navbar-margin');
    }

    ngOnDestroy(): void {
        document.getElementById('content').classList.remove('w-100');
        document.getElementById('wrapper').classList.add('navbar-margin');
    }

    submitForm() {
        const credentials = this.loginForm.value;
        this.isBadCredentials = false;
        this.isSubmitting = true;
        this.isTimeout = false;

        this.authService.attemptAuthentication(credentials).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
            },
            err => {
                this.isSubmitting = false;
                this.handleErrorResponse(err.status);
            }
        );

        this.authService.isAuthenticated.takeUntil(this.ngUnsubscribe).subscribe(
            (isAuthenticated: boolean) => {
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
}
