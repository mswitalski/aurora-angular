import {HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiService} from './api.service';
import {AdminPasswordChangeFormModel, PagedResults, PasswordChangeFormModel, User} from '../model';
import {environment} from '../../../environments/environment';
import {UserSearchForm} from '../model/user-search-form.model';

@Injectable()
export class UsersService {

    private cachedUser: User;

    constructor(private api: ApiService) {}

    createUserAsAdmin(user: User): Observable<HttpResponse<any>> {
        return this.api.post('admin/users/', user);
    }

    createUserAsUnitLeader(user: User): Observable<HttpResponse<any>> {
        return this.api.post('unitleader/users/', user);
    }

    deleteUser(user: User): Observable<HttpResponse<any>> {
        return this.api.deleteMethod('admin/users/' + user.id);
    }

    getAllByPage(page: number = 0): Observable<PagedResults<User>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'users/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams);
    }

    getSingle(username: string): Observable<User> {
        const partialUrl = 'users/' + username;

        return this.api.get(partialUrl).map(user => user.body).do(user => this.cachedUser = user);
    }

    getCachedUser(username: string): Observable<User> {
        if (this.cachedUser && this.cachedUser.username === username) {
            return Observable.of(this.cachedUser);

        } else {
            return this.getSingle(username);
        }
    }

    search(criteria: UserSearchForm, page: number = 0): Observable<PagedResults<User>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'search/users/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.postWithParams(partialUrl, queryParams, criteria);
    }

    updateAsAdmin(user: User): Observable<HttpResponse<any>> {
        return this.api.put('admin/users/', user);
    }

    updateAsUnitLeader(user: User): Observable<HttpResponse<any>> {
        return this.api.put('unitleader/users/', user);
    }

    updateOtherPassword(user: User, formData: AdminPasswordChangeFormModel): Observable<HttpResponse<any>> {
        const partialUrl = 'admin/users/' + user.id + '/password';

        return this.api.put(partialUrl, formData);
    }

    updateOwnAccount(user: User): Observable<HttpResponse<any>> {
        return this.api.put('users/', user);
    }

    updateOwnPassword(formData: PasswordChangeFormModel): Observable<HttpResponse<any>> {
        return this.api.put('users/password', formData);
    }
}
