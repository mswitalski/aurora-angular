import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {AuthService} from '../../msh/service';

@Injectable()
export class IsNotEvaluationOwnerGuard implements CanActivate {

    constructor(private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.loggedUser.map(u => parseInt(route.params['userId'], 10) !== u.id);
    }
}
