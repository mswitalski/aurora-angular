import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Evaluation} from '../../../shared/model';
import {EvaluationsService} from '../../../shared/service';

@Injectable()
export class UserEvaluationsListResolver implements Resolve<Evaluation[]> {

    constructor(private evaluationsService: EvaluationsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Evaluation[]> {
        return this.evaluationsService.getAllByUserAsUnitLeader(route.params['userId']);
    }
}
