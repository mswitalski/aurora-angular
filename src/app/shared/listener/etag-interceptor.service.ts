import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class EtagInterceptorService implements HttpInterceptor {

    private etagPlaceholderName = 'ETag';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'GET') {
            return next.handle(req).do(
                event => {
                    if (event instanceof HttpResponse && event.status === 200) {
                        window.localStorage[this.etagPlaceholderName] = event.headers.get('Etag').replace(/"/g, '');
                    }
                });

        } else if (req.method === 'PUT') {
            // TODO: check this
            req.headers.append('ETag', window.localStorage[this.etagPlaceholderName]);

            return next.handle(req);

        } else {
            return next.handle(req);
        }
    }
}
