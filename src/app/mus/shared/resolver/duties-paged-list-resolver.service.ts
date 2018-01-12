import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Duty, PagedResults} from '../../../msh/model';
import {DutiesService} from '../../../msh/service';

@Injectable()
export class DutiesPagedListResolver implements Resolve<PagedResults<Duty>> {

    constructor(private dutiesService: DutiesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResults<Duty>> {
        return this.dutiesService.getAllByPage();
    }
}
