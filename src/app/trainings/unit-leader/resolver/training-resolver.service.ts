import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TrainingsService} from '../../../shared/service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Training} from '../../../shared/model';

@Injectable()
export class TrainingResolver implements Resolve<Training> {

    constructor(private trainingsService: TrainingsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Training> {
        return this.trainingsService.getSingleAsUnitLeader(route.params['trainingId']);
    }
}
