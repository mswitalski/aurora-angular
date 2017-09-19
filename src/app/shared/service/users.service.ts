import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user.model';

@Injectable()
export class UsersService {

    constructor(private api: ApiService) {}

    getSingle(username: string): Observable<User> {
        const partialUrl = 'users/' + username;

        return this.api.get(partialUrl);
    }
}
