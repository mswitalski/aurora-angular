import 'rxjs/add/operator/catch';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Router} from '@angular/router';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch(err => {
                if (this.isHandledErrorResponse(err) && this.isNotLoginAction()) {
                    this.router.navigate(['/error/' + err.status], { skipLocationChange: true });

                    return Observable.of();

                } else {
                    return Observable.throw(err);
                }
            });
    }

    private isHandledErrorResponse(err: any): boolean {
        return err instanceof HttpErrorResponse && err.status > 400;
    }

    private isNotLoginAction(): boolean {
        return window.location.href.indexOf('/login') === -1;
    }
}
