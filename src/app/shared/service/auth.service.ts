import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {User} from '../model/user.model';
import {Response} from '@angular/http';
import {LoginCredentials} from '../model/login-credentials.model';

@Injectable()
export class AuthService {

    private loggedUserSubject = new BehaviorSubject<User>(new User());
    public loggedUser = this.loggedUserSubject.asObservable().distinctUntilChanged();
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private apiService: ApiService, private jwtService: JwtService) {
        this.isAuthenticatedSubject.next(false);
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

    attemptAuthentication(userCredentials: LoginCredentials): Observable<Response> {
        const response = this.apiService.login(userCredentials);
        response.subscribe(
            data => {
                this.jwtService.setToken(data.headers.get('Authorization'));
                this.apiService.get('users/' + userCredentials.username)
                    .subscribe(loggedUser => this.authenticate(loggedUser));
            });

        return response;
    }

    getLoggedUser(): User {
        return this.loggedUserSubject.value;
    }
}
