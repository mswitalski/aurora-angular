import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {PagedResults, Skill} from '../../../shared/model';
import {SkillsService} from '../../../shared/service';

@Injectable()
export class SkillsListResolver implements Resolve<PagedResults<Skill>> {

    constructor(private skillsService: SkillsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResults<Skill>> {
        return this.skillsService.getAllByPage();
    }
}
