import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ApiService} from './api.service';
import {environment} from '../../../environments/environment';
import {JwtService} from './jwt.service';
import {User} from '../model/user.model';

@Injectable()
export class AuthService {

    private loggedUserSubject = new BehaviorSubject<User>(new User());
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public loggedUser = this.loggedUserSubject.asObservable().distinctUntilChanged();
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private apiService: ApiService, private jwtService: JwtService) {
    }

    populate() {
        if (this.jwtService.getToken()) {
            this.apiService.get('/user').subscribe(
                data => this.authenticate(data),
                err => this.invalidateAuthentication()
            );

        } else {
            this.invalidateAuthentication();
        }
    }

    private authenticate(user: User) {
        this.loggedUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    private invalidateAuthentication() {
        this.jwtService.invalidateToken();
        this.loggedUserSubject.next(new User());
        this.isAuthenticatedSubject.next(false);
    }

    attemptAuthentication(userCredentials): Observable<User> {
        return this.apiService.post(`${environment.loginUrl}`, userCredentials)
            .map(data => {
                this.authenticate(data);
                return data;
            });
    }

    getLoggedUser(): User {
        return this.loggedUserSubject.value;
    }
}
