import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from '../../model';
import {UsersService} from '../../service';

@Injectable()
export class CachedUserResolver implements Resolve<User> {

    constructor(private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.usersService.getCachedUser(route.params['username']);
    }
}
