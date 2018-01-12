import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Evaluation} from '../../../msh/model';
import {EvaluationsService} from '../../../msh/service';

@Injectable()
export class EvaluationsListResolver implements Resolve<Evaluation[]> {

    constructor(private evaluationsService: EvaluationsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Evaluation[]> {
        return this.evaluationsService.getAllByUserAsUnitLeader(route.params['userId']);
    }
}
