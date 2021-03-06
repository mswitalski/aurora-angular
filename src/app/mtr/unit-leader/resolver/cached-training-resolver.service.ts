import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TrainingsService} from '../../../msh/service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Training} from '../../../msh/model';

@Injectable()
export class CachedTrainingResolver implements Resolve<Training> {

    constructor(private trainingsService: TrainingsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Training> {
        return this.trainingsService.getCachedTraining(route.params['trainingId']);
    }
}
