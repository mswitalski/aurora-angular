import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/share';

import {environment} from '../../../environments/environment';
import {JwtService} from './jwt.service';
import {LoginCredentials} from '../model/login-credentials.model';

/**
 * Service providing interaction with backend api.
 */
@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private jwtService: JwtService) {
    }

    get(partialUrl: string): Observable<any> {
        const url = `${environment.backendUrl}${partialUrl}`;

        return this.http.get(url, {headers: this.prepareHeaders()});
    }

    private prepareHeaders(): HttpHeaders {
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

    post(partialUrl: string, objectToPost: Object): Observable<any> {
        const url = `${environment.backendUrl}${partialUrl}`;

        return this.http.post(url, JSON.stringify(objectToPost), {headers: this.prepareHeaders()});
    }

    put(partialUrl: string, objectToPut: Object, eTag: string): Observable<any> {
        const url = `${environment.backendUrl}${partialUrl}`;

        return this.http.post(url, JSON.stringify(objectToPut), {headers: this.prepareHeadersForUpdate(eTag)});
    }

    private prepareHeadersForUpdate(eTag: string): HttpHeaders {
        const headers = this.prepareHeaders();

        if (eTag) {
            headers['ETag'] = eTag;
        }

        return headers;
    }

    login(credentials: LoginCredentials): Observable<any> {
        return this.http.post(
            `${environment.loginUrl}`,
            JSON.stringify(credentials),
            {headers: this.prepareHeaders(), observe: 'response'})
            .timeout(5000)
            .share();
    }
}
