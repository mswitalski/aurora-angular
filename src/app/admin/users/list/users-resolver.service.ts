import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {PagedResults, User} from '../../../shared/model';
import {UsersService} from '../../../shared/service';

@Injectable()
export class UsersResolverService implements Resolve<PagedResults<User>> {

    constructor(private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResults<User>> {
        return this.usersService.getAllByPage();
    }
}
