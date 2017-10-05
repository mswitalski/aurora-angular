import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/share';

import {environment} from '../../../environments/environment';
import {JwtService} from './jwt.service';
import {LoginCredentials} from '../model';

/**
 * Service providing interaction with backend api.
 */
@Injectable()
export class ApiService {

    private eTag: string;

    constructor(private http: HttpClient, private jwtService: JwtService) {
    }

    get(partialUrl: string): Observable<any> {
        const url = environment.backendUrl + partialUrl;

        return this.http.get(url, {headers: this.prepareDefaultHeaders(), observe: 'response'})
            .do(data => this.storeETag(data.headers));
    }

    getWithParams(partialUrl: string, params: HttpParams): Observable<any> {
        const url = environment.backendUrl + partialUrl;

        return this.http.get(url, {params: params, headers: this.prepareDefaultHeaders()});
    }

    private prepareDefaultHeaders(): HttpHeaders {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const token = this.jwtService.getToken();

        if (token) {
            defaultHeaders['Authorization'] = token;
        }

        return new HttpHeaders(defaultHeaders);
    }

    private storeETag(responseHeaders: HttpHeaders) {
        if (responseHeaders.get('ETag')) {
            this.eTag = responseHeaders.get('ETag').replace(/"/g, '');

        } else {
            this.eTag = null;
        }
    }

    post(partialUrl: string, objectToPost: Object): Observable<any> {
        const url = environment.backendUrl + partialUrl;

        return this.http.post(url, JSON.stringify(objectToPost), {headers: this.prepareDefaultHeaders()});
    }

    put(partialUrl: string, objectToPut: Object): Observable<HttpResponse<any>> {
        const url = environment.backendUrl + partialUrl;

        return this.http.put(
            url,
            JSON.stringify(objectToPut),
            {headers: this.prepareHeadersForUpdate(), observe: 'response'});
    }

    private prepareHeadersForUpdate(): HttpHeaders {
        const defaultHeaders = this.prepareDefaultHeaders();

        return defaultHeaders.append('If-Match', this.eTag);
    }

    deleteMethod(partialUrl: string): Observable<HttpResponse<any>> {
        const url = environment.backendUrl + partialUrl;

        return this.http.delete(
            url,
            {headers: this.prepareHeadersForUpdate(), observe: 'response'});
    }

    login(credentials: LoginCredentials): Observable<any> {
        return this.http.post(
            environment.loginUrl,
            JSON.stringify(credentials),
            {headers: this.prepareDefaultHeaders(), observe: 'response'})
            .timeout(5000)
            .share();
    }
}
