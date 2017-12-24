import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Mentor, PagedResults} from '../../../shared/model';
import {Observable} from 'rxjs/Observable';
import {MentorsService} from '../../../shared/service';

@Injectable()
export class MentorsListResolver implements Resolve<PagedResults<Mentor>> {

    constructor(private mentorsService: MentorsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResults<Mentor>> {
        return this.mentorsService.getAllByPageAsUnitLeader();
    }
}
