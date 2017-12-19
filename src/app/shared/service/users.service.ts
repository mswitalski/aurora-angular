import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiService} from './api.service';
import {AdminPasswordChangeFormModel, PagedResults, PasswordChangeFormModel, User, UserSearchForm} from '../model';
import {environment} from '../../../environments/environment';

@Injectable()
export class UsersService {

    private cachedUser: User;

    constructor(private api: ApiService) {}

    createUserAsAdmin(user: User): Observable<User> {
        return this.api.post('users/', user, environment.api.role.admin);
    }

    createUserAsUnitLeader(user: User): Observable<User> {
        return this.api.post('users/', user, environment.api.role.unitleader);
    }

    deleteUserAsAdmin(user: User): Observable<void> {
        return this.api.deleteMethod('users/' + user.id, environment.api.role.admin);
    }

    deleteUserAsUnitLeader(user: User): Observable<any> {
        return this.api.deleteMethod('users/' + user.id, environment.api.role.unitleader);
    }

    getAllByPage(page: number = 0): Observable<PagedResults<User>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'users/paged/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams, environment.api.role.common);
    }

    getProfile(): Observable<User> {
        return this.api.get('profile', environment.api.role.common).do(user => this.cachedUser = user);
    }

    getSingle(userId: number): Observable<User> {
        const partialUrl = 'users/' + userId;

        return this.api.get(partialUrl, environment.api.role.common).do(user => this.cachedUser = user);
    }

    getCachedUser(userId: number): Observable<User> {
        if (this.cachedUser && this.cachedUser.id === userId) {
            return Observable.of(this.cachedUser);

        } else {
            return this.getSingle(userId);
        }
    }

    search(criteria: UserSearchForm, page: number = 0): Observable<PagedResults<User>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'users/search/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.postWithParams(partialUrl, queryParams, criteria, environment.api.role.common);
    }

    updateAsAdmin(user: User): Observable<void> {
        return this.api.put('users/' + user.id, user, environment.api.role.admin);
    }

    updateAsUnitLeader(user: User): Observable<void> {
        return this.api.put('users/' + user.id, user, environment.api.role.unitleader);
    }

    updateOtherPassword(user: User, formData: AdminPasswordChangeFormModel): Observable<void> {
        const partialUrl = 'users/' + user.id + '/password';

        return this.api.put(partialUrl, formData, environment.api.role.admin);
    }

    updateProfile(user: User): Observable<void> {
        return this.api.put('profile/', user, environment.api.role.common);
    }

    updateProfilePassword(formData: PasswordChangeFormModel): Observable<void> {
        return this.api.put('profile/password', formData, environment.api.role.common);
    }

    updateDuties(user: User): Observable<void> {
        const partialUrl = 'users/' + user.id + '/duties/';

        return this.api.put(partialUrl, user, environment.api.role.unitleader);
    }
}
