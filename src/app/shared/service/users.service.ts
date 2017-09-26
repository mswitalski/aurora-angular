import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiService} from './api.service';
import {User} from '../model';
import {PasswordChangeFormModel} from '../model/password-change-form.model';

@Injectable()
export class UsersService {

    constructor(private api: ApiService) {}

    getSingle(username: string): Observable<HttpResponse<any>> {
        const partialUrl = 'users/' + username;

        return this.api.get(partialUrl);
    }

    updateOwnAccount(user: User): Observable<HttpResponse<any>> {
        return this.api.put('users/', user);
    }

    updateOwnPassword(formData: PasswordChangeFormModel): Observable<HttpResponse<any>> {
        return this.api.put('users/password', formData);
    }
}
