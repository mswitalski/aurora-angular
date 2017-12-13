import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ApiService} from './api.service';
import {environment} from '../../../environments/environment';
import {PagedResults, Skill, SkillSearchForm} from '../model';

@Injectable()
export class SkillsService {

    private cachedSkill: Skill;

    constructor(private api: ApiService) {}

    create(skill: Skill): Observable<Skill> {
        return this.api.post('skills/', skill, environment.api.role.unitleader);
    }

    delete(skill: Skill): Observable<void> {
        return this.api.deleteMethod('skills/' + skill.id, environment.api.role.unitleader);
    }

    getAll(): Observable<Skill[]> {
        return this.api.get('skills/', environment.api.role.common);
    }

    getAllByPage(page: number = 0): Observable<PagedResults<Skill>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'skills/paged/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams, environment.api.role.unitleader);
    }

    getSingle(skillId: number): Observable<Skill> {
        const partialUrl = 'skills/' + skillId;

        return this.api.get(partialUrl, environment.api.role.unitleader).do(skill => this.cachedSkill = skill);
    }

    getCachedSkill(skillId: number): Observable<Skill> {
        if (this.cachedSkill && this.cachedSkill.id === skillId) {
            return Observable.of(this.cachedSkill);

        } else {
            return this.getSingle(skillId);
        }
    }

    search(criteria: SkillSearchForm, page: number = 0): Observable<PagedResults<Skill>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'skills/search/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.postWithParams(partialUrl, queryParams, criteria, environment.api.role.unitleader);
    }

    update(skill: Skill): Observable<void> {
        return this.api.put('skills/' + skill.id, skill, environment.api.role.unitleader);
    }
}
