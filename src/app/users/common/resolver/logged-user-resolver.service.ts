import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import {UsersService} from '../../../shared/service';
import {User} from '../../../shared/model';

@Injectable()
export class LoggedUserResolver implements Resolve<User> {

    constructor(private usersService: UsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.usersService.getProfile();
    }
}
