import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Skill} from '../../../shared/model';
import {SkillsService} from '../../../shared/service';

@Injectable()
export class SkillResolver implements Resolve<Skill> {

    constructor(private skillsService: SkillsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Skill> {
        return this.skillsService.getSingle(route.params['skillId']);
    }
}
