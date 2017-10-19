import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import {AuthService} from '../shared/service';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isAuthenticated.map(value => {
            if (value) {
                this.router.navigate(['/dashboard']);

                return !value;

            } else {
                return true;
            }
        });
    }
}
