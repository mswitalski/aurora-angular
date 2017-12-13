import {Evaluation} from '../../../shared/model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {EvaluationsService} from '../../../shared/service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserCachedEvaluationResolver implements Resolve<Evaluation> {

    constructor(private evaluationsService: EvaluationsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Evaluation> {
        return this.evaluationsService.getCachedEvaluationAsUnitLeader(route.params['evaluationId']);
    }
}
