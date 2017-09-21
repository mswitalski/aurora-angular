import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {User} from '../model/user.model';
import {LoginCredentials} from '../model/login-credentials.model';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/skip';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class AuthService {

    private loggedUserSubject = new BehaviorSubject<User>(new User());
    public loggedUser = this.loggedUserSubject.asObservable().distinctUntilChanged();
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject;
    private hasAdminRoleSubject = new BehaviorSubject<boolean>(false);
    public hasAdminRole = this.hasAdminRoleSubject.asObservable();
    private hasUnitLeaderRoleSubject = new BehaviorSubject<boolean>(false);
    public hasUnitLeaderRole = this.hasUnitLeaderRoleSubject.asObservable();
    private hasEmployeeRoleSubject = new BehaviorSubject<boolean>(false);
    public hasEmployeeRole = this.hasEmployeeRoleSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        ) {
        this.hasAdminRoleSubject.next(false);
        this.hasUnitLeaderRoleSubject.next(false);
        this.hasEmployeeRoleSubject.next(false);
    }

    populate() {
        if (this.jwtService.getToken()) {
            this.fetchLoggedUserData();

        } else {
            this.invalidateAuthentication();
        }
    }

    private fetchLoggedUserData() {
        this.apiService.get('user').subscribe(
            user => {
                this.authenticate(user.body);
            },
            err => this.invalidateAuthentication()
        );
    }

    private authenticate(user: User) {
        this.loggedUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        this.populateRoles(user);
    }

    private populateRoles(user: User) {
        this.hasAdminRoleSubject
            .next(user.roles.find(r => r.name === `${environment.adminRole}`) !== undefined);
        this.hasUnitLeaderRoleSubject
            .next(user.roles.find(r => r.name === `${environment.unitLeaderRole}`) !== undefined);
        this.hasEmployeeRoleSubject
            .next(user.roles.find(r => r.name === `${environment.employeeRole}`) !== undefined);
    }

    private invalidateAuthentication() {
        this.jwtService.invalidateToken();
        this.loggedUserSubject.next(new User());
        this.isAuthenticatedSubject.next(false);
        this.hasAdminRoleSubject.next(false);
        this.hasUnitLeaderRoleSubject.next(false);
        this.hasEmployeeRoleSubject.next(false);
    }

    attemptAuthentication(userCredentials: LoginCredentials): Observable<any> {
        const response = this.apiService.login(userCredentials);
        response.subscribe(
            data => {
                this.jwtService.setToken(data.headers.get('Authorization'));
                this.fetchLoggedUserData();
            },
            error => error);

        return response;
    }

    logout(): void {
        this.invalidateAuthentication();
    }
}
