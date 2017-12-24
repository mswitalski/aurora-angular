import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {DutiesService} from '../../../shared/service';
import {Duty} from '../../../shared/model';

@Injectable()
export class CachedDutyResolver implements Resolve<Duty> {

    constructor(private dutiesService: DutiesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Duty> {
        return this.dutiesService.getCachedUser(route.params['dutyId']);
    }
}
