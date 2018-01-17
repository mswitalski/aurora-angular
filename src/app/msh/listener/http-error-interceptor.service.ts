import 'rxjs/add/operator/catch';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Router} from '@angular/router';
import 'rxjs/add/observable/throw';
import {AuthService, JwtService} from '../service';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {

    constructor(private router: Router, private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((err: HttpErrorResponse) => {
                if (this.isLoginAction() || err.status === 400) {
                    return Observable.throw(err);

                } else if (err.status === 401) {
                    this.injector.get(AuthService).logout();
                    this.router.navigate(['/login']);

                } else {
                    this.router.navigate(['/error/' + err.status], {skipLocationChange: true});
                }

                return Observable.of();
            });
    }

    private isLoginAction(): boolean {
        return window.location.href.indexOf('/login') !== -1;
    }
}
