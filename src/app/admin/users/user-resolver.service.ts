import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../../shared/model';
import {UsersService} from '../../shared/service';


@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private router: Router, private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.usersService.getSingle(route.params['username']).map(r => r.body)
            .catch((err) => this.router.navigateByUrl('/'));
    }

}
