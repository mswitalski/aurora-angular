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

    create(duty: Duty): Observable<HttpResponse<any>> {
        return this.api.post('unitleader/duties/', duty);
    }

    delete(duty: Duty): Observable<HttpResponse<any>> {
        return this.api.deleteMethod('unitleader/duties/' + duty.id);
    }

    getAllByPage(page: number = 0): Observable<PagedResults<Duty>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'duties/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams);
    }

    getSingle(dutyId: number): Observable<Duty> {
        const partialUrl = 'duties/' + dutyId;

        return this.api.get(partialUrl).map(duty => duty.body).do(duty => this.cachedDuty = duty);
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
        const partialUrl = 'search/duties/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.postWithParams(partialUrl, queryParams, criteria);
    }

    update(duty: Duty): Observable<HttpResponse<any>> {
        return this.api.put('unitleader/duties/', duty);
    }
}
