import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {EtagService} from '../service/etag.service';

@Injectable()
export class EtagInterceptorService implements HttpInterceptor {

    constructor(private etagService: EtagService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'GET') {
            return next.handle(req).do(
                event => {
                    if (event instanceof HttpResponse && event.status === 200) {
                        this.etagService.etag = event.headers.get('Etag');
                    }
                });

        } else if (req.method === 'PUT') {
            // TODO: check this
            req.headers.append('ETag', this.etagService.etag);

            return next.handle(req);

        } else {
            return next.handle(req);
        }
    }
}
