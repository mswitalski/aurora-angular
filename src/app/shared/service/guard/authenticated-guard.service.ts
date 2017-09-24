import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isAuthenticated.map(value => {
            if (value) {
                return value;

            } else {
                this.router.navigate(['/login']);

                return false;
            }
        });
    }
}
