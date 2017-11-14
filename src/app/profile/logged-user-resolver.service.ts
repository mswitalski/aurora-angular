import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import {AuthService, UsersService} from '../shared/service';
import {User} from '../shared/model';

@Injectable()
export class LoggedUserResolver implements Resolve<User> {

    constructor(private authService: AuthService, private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.authService.loggedUser
            .flatMap(u => this.usersService.getProfile())
            .take(1);
    }
}
