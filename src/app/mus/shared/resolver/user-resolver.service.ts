import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../msh/model';
import {UsersService} from '../../../msh/service';

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private usersService: UsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.usersService.getSingle(route.params['userId']);
    }
}
