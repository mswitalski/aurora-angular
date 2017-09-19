import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../shared/service/auth.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // return this.authService.isAuthenticated.take(1).map(is => !is);
        return this.authService.isAuthenticated.map(value => {
            console.log(value);
            if (value) {
                this.router.navigate(['/dashboard']);

                return !value;

            } else {

                return true;
            }
        });
    }
}
