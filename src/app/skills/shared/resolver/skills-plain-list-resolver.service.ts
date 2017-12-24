import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Skill} from '../../../shared/model';
import {SkillsService} from '../../../shared/service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SkillsPlainListResolver implements Resolve<Skill[]> {

    constructor(private skillsService: SkillsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Skill[]> {
        return this.skillsService.getAll();
    }
}
