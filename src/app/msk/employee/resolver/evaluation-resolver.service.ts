import {Evaluation} from '../../../msh/model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {EvaluationsService} from '../../../msh/service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EvaluationResolver implements Resolve<Evaluation> {

    constructor(private evaluationsService: EvaluationsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Evaluation> {
        return this.evaluationsService.getSingleAsEmployee(route.params['evaluationId']);
    }
}
