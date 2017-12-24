import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Evaluation} from '../../../shared/model';
import {AuthService, EvaluationsService} from '../../../shared/service';

@Injectable()
export class EvaluationsListResolver implements Resolve<Evaluation[]> {

    constructor(private authService: AuthService, private evaluationsService: EvaluationsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Evaluation[]> {
        return this.authService.loggedUser.flatMap(u => this.evaluationsService.getAllByUserAsEmployee(u)).take(1);
    }
}
