import {HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiService} from './api.service';
import {Duty, DutySearchForm, PagedResults} from '../model';
import {environment} from '../../../environments/environment';

@Injectable()
export class DutiesService {

    private cachedDuty: Duty;

    constructor(private api: ApiService) {}

    create(duty: Duty): Observable<Duty> {
        return this.api.post('duties/', duty, environment.api.role.unitleader);
    }

    deleteDuty(duty: Duty): Observable<void> {
        return this.api.deleteMethod('duties/' + duty.id, environment.api.role.unitleader);
    }

    getAll(): Observable<Duty[]> {
        return this.api.get('duties/', environment.api.role.unitleader);
    }

    getAllByPage(page: number = 0): Observable<PagedResults<Duty>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'duties/paged/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams, environment.api.role.unitleader);
    }

    getSingle(dutyId: number): Observable<Duty> {
        const partialUrl = 'duties/' + dutyId;

        return this.api.get(partialUrl, environment.api.role.unitleader).do(duty => this.cachedDuty = duty);
    }

    getCachedUser(dutyId: number): Observable<Duty> {
        if (this.cachedDuty && this.cachedDuty.id === dutyId) {
            return Observable.of(this.cachedDuty);

        } else {
            return this.getSingle(dutyId);
        }
    }

    search(criteria: DutySearchForm, page: number = 0): Observable<PagedResults<Duty>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'duties/search/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.postWithParams(partialUrl, queryParams, criteria, environment.api.role.unitleader);
    }

    update(duty: Duty): Observable<void> {
        return this.api.put('duties/' + duty.id, duty, environment.api.role.unitleader);
    }
}
