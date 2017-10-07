import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Role} from '../../shared/model';
import {RolesService} from '../../shared/service/roles.service';


@Injectable()
export class RolesResolver implements Resolve<Role[]> {

    constructor(private rolesService: RolesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
        return this.rolesService.getAll();
    }

}
