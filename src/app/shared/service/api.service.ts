import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {environment} from '../../../environments/environment';
import {JwtService} from './jwt.service';
import {LoginCredentials} from '../model/login-credentials.model';

/**
 * Service providing interaction with backend api.
 */
@Injectable()
export class ApiService {

    constructor(private http: Http, private jwtService: JwtService) {
    }

    get(partialUrl: string): Observable<any> {
        const url = `${environment.backendUrl}${partialUrl}`;

        return this.http.get(url, {headers: this.prepareHeaders()})
            .catch(this.processErrors)
            .map((r: Response) => r.json());
    }

    private prepareHeaders(): Headers {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const token = this.jwtService.getToken();

        if (token) {
            defaultHeaders['Authorization'] = token;
        }

        return new Headers(defaultHeaders);
    }

    private processErrors(error: any) {
        return Observable.throw(error.json());
    }

    post(partialUrl: string, objectToPost: Object): Observable<any> {
        const url = `${environment.backendUrl}${partialUrl}`;

        return this.http.post(url, JSON.stringify(objectToPost), {headers: this.prepareHeaders()})
            .catch(this.processErrors)
            .map((r: Response) => r.json());
    }

    put(partialUrl: string, objectToPut: Object, eTag: string): Observable<any> {
        const url = `${environment.backendUrl}${partialUrl}`;

        return this.http.post(url, JSON.stringify(objectToPut), {headers: this.prepareHeadersForUpdate(eTag)})
            .catch(this.processErrors)
            .map((r: Response) => r.json());
    }

    private prepareHeadersForUpdate(eTag: string): Headers {
        const headers = this.prepareHeaders();

        if (eTag) {
            headers['ETag'] = eTag;
        }

        return headers;
    }

    login(credentials: LoginCredentials): Observable<Response> {
        return this.http.post(
            `${environment.loginUrl}`,
            JSON.stringify(credentials),
            {headers: this.prepareHeaders()})
            .catch(this.processErrors).share();
    }
}
