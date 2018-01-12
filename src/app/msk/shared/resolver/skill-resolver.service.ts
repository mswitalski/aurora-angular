import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Skill} from '../../../msh/model';
import {SkillsService} from '../../../msh/service';

@Injectable()
export class SkillResolver implements Resolve<Skill> {

    constructor(private skillsService: SkillsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Skill> {
        return this.skillsService.getSingle(route.params['skillId']);
    }
}
