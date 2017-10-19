import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../../model';
import {UsersService} from '../../service';

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.usersService.getSingle(route.params['username']);
    }
}
