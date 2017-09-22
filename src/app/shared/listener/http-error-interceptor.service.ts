import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do(
            () => {},
            err => {
                if (err instanceof HttpErrorResponse) {
                    return this.handleErrors(err);
                }
            });
    }

    private handleErrors(response: HttpErrorResponse) {
        if (response.status > 400) {
            this.router.navigate(['/error/' + response.status], { skipLocationChange: true });
        }

        return response;
    }
}
