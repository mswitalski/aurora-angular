import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user.model';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class UsersService {

    constructor(private api: ApiService) {}

    getSingle(username: string): Observable<HttpResponse<any>> {
        const partialUrl = 'users/' + username;

        return this.api.get(partialUrl);
    }

    update(user: User): Observable<HttpResponse<any>> {
        return this.api.put('users/', user);
    }

}
