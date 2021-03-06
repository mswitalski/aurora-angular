import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DutiesService} from '../../../msh/service';
import {Duty} from '../../../msh/model';

@Injectable()
export class DutyResolver implements Resolve<Duty> {

    constructor(private dutiesService: DutiesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Duty> {
        return this.dutiesService.getSingle(route.params['dutyId']);
    }
}
