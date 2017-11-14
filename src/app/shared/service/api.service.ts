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

    get(partialUrl: string, requesterRole: string): Observable<any> {
        const url = environment.backendUrl + partialUrl;

        return this.http.get(url, {headers: this.prepareDefaultHeaders(requesterRole), observe: 'response'})
            .do(data => this.storeETag(data.headers));
    }

    getWithParams(partialUrl: string, params: HttpParams, requesterRole: string): Observable<any> {
        const url = environment.backendUrl + partialUrl;

        return this.http.get(url, {params: params, headers: this.prepareDefaultHeaders(requesterRole)});
    }

    private prepareDefaultHeaders(header: string): HttpHeaders {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        const token = this.jwtService.getToken();

        if (header) {
            defaultHeaders[environment.api.header] = header;
        }
        if (token) {
            defaultHeaders['Authorization'] = token;
        }

        return new HttpHeaders(defaultHeaders);
    }

    private storeETag(responseHeaders: HttpHeaders) {
        if (responseHeaders.get('ETag')) {
            this.eTag = responseHeaders.get('ETag').replace(/"/g, '');
        }
    }

    post(partialUrl: string, objectToPost: Object, requesterRole: string): Observable<any> {
        const url = environment.backendUrl + partialUrl;

        return this.http.post(url, JSON.stringify(objectToPost), {headers: this.prepareDefaultHeaders(requesterRole)});
    }

    postWithParams(partialUrl: string, params: HttpParams, objectToPost: Object, requesterRole: string): Observable<any> {
        const url = environment.backendUrl + partialUrl;

        return this.http.post(url, JSON.stringify(objectToPost), {params: params, headers: this.prepareDefaultHeaders(requesterRole)});
    }

    put(partialUrl: string, objectToPut: Object, requesterRole: string): Observable<HttpResponse<any>> {
        const url = environment.backendUrl + partialUrl;

        return this.http.put(
            url,
            JSON.stringify(objectToPut),
            {headers: this.prepareHeadersForUpdate(requesterRole), observe: 'response'});
    }

    private prepareHeadersForUpdate(header: string): HttpHeaders {
        const defaultHeaders = this.prepareDefaultHeaders(header);

        return defaultHeaders.append('If-Match', this.eTag);
    }

    deleteMethod(partialUrl: string, requesterRole: string): Observable<HttpResponse<any>> {
        const url = environment.backendUrl + partialUrl;

        return this.http.delete(
            url,
            {headers: this.prepareHeadersForUpdate(requesterRole), observe: 'response'});
    }

    login(credentials: LoginCredentials): Observable<any> {
        return this.http.post(
            environment.loginUrl,
            JSON.stringify(credentials),
            {headers: this.prepareDefaultHeaders(''), observe: 'response'})
            .timeout(5000)
            .share();
    }
}
