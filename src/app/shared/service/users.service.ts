import {HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiService} from './api.service';
import {AdminPasswordChangeFormModel, PagedResults, PasswordChangeFormModel, User} from '../model';
import {environment} from '../../../environments/environment';
import {Role} from '../model/role.model';

@Injectable()
export class UsersService {

    constructor(private api: ApiService) {}

    getSingle(username: string): Observable<HttpResponse<any>> {
        const partialUrl = 'users/' + username;

        return this.api.get(partialUrl);
    }

    getAllByPage(page: number = 0): Observable<PagedResults<User>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'users/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams);
    }

    updateOwnAccount(user: User): Observable<HttpResponse<any>> {
        return this.api.put('users/', user);
    }

    updateOwnPassword(formData: PasswordChangeFormModel): Observable<HttpResponse<any>> {
        return this.api.put('users/password', formData);
    }

    updateOtherAccountAsAdmin(user: User): Observable<HttpResponse<any>> {
        return this.api.put('admin/users/', user);
    }

    updateOtherPassword(user: User, formData: AdminPasswordChangeFormModel): Observable<HttpResponse<any>> {
        const partialUrl = 'admin/users/' + user.id + '/password';

        return this.api.put(partialUrl, formData);
    }

    assignRole(user: User, role: Role): Observable<HttpResponse<any>> {
        const partialUrl = 'admin/users/' + user.id + '/role/' + role.name;

        return this.api.put(partialUrl, null);
    }

    retractRole(user: User, role: Role): Observable<HttpResponse<any>> {
        const partialUrl = 'admin/users/' + user.id + '/role/' + role.name;

        return this.api.delete(partialUrl);
    }
}
