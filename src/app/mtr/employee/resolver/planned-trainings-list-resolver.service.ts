import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TrainingsService} from '../../../msh/service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PagedResults, Training} from '../../../msh/model';

@Injectable()
export class PlannedTrainingsListResolver implements Resolve<PagedResults<Training>> {

    constructor(private trainingsService: TrainingsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResults<Training>> {
        return this.trainingsService.getEmployeePlannedByPage();
    }
}
