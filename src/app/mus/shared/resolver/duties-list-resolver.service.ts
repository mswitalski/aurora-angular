import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Duty} from '../../../msh/model';
import {DutiesService} from '../../../msh/service';

@Injectable()
export class DutiesListResolver implements Resolve<Duty[]> {

    constructor(private dutiesService: DutiesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Duty[]> {
        return this.dutiesService.getAll();
    }
}
