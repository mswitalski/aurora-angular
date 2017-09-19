import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../shared/model/user.model';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../shared/service/auth.service';
import {UsersService} from '../shared/service/users.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private authService: AuthService, private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.authService.loggedUser
            .flatMap(u => this.usersService.getSingle(u.username))
            .take(1);
    }

}
