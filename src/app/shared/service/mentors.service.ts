import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Mentor, MentorSearchForm, PagedResults} from '../model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class MentorsService {

    constructor(private api: ApiService) {
    }

    create(mentor: Mentor): Observable<Mentor> {
        return this.api.post('mentors/', mentor, environment.api.role.employee);
    }

    deleteAsEmployee(mentor: Mentor): Observable<void> {
        return this.api.deleteMethod('mentors/' + mentor.id, environment.api.role.employee);
    }

    deleteAsUnitLeader(mentor: Mentor): Observable<any> {
        return this.api.deleteMethod('mentors/' + mentor.id, environment.api.role.unitleader);
    }

    getAllByPageAsEmployee(page: number = 0): Observable<PagedResults<Mentor>> {
        return this.getAllByPage(page, environment.api.role.employee);
    }

    private getAllByPage(page: number, role: string): Observable<PagedResults<Mentor>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'mentors/paged/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams, role);
    }

    getAllByPageAsUnitLeader(page: number = 0): Observable<PagedResults<Mentor>> {
        return this.getAllByPage(page, environment.api.role.unitleader);
    }

    getAllMentoringsByUser(userId: number, page: number = 0): Observable<PagedResults<Mentor>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'users/' + userId + '/mentoring/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams, environment.api.role.employee);
    }

    getSingleAsEmployee(mentorId: number): Observable<Mentor> {
        return this.api.get('mentors/' + mentorId, environment.api.role.employee);
    }

    getSingleAsUnitLeader(mentorId: number): Observable<Mentor> {
        return this.api.get('mentors/' + mentorId, environment.api.role.unitleader);
    }

    searchAsEmployee(criteria: MentorSearchForm, page: number = 0): Observable<PagedResults<Mentor>> {
        return this.search(criteria, page, environment.api.role.employee);
    }

    private search(criteria: MentorSearchForm, page: number, role: string): Observable<PagedResults<Mentor>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'mentors/search/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.postWithParams(partialUrl, queryParams, criteria, role);
    }

    searchAsUnitLeader(criteria: MentorSearchForm, page: number = 0): Observable<PagedResults<Mentor>> {
        return this.search(criteria, page, environment.api.role.unitleader);
    }

    updateAsEmployee(mentor: Mentor): Observable<void> {
        return this.api.put('mentors/' + mentor.id, mentor, environment.api.role.employee);
    }

    updateAsUnitLeader(mentor: Mentor): Observable<void> {
        return this.api.put('mentors/' + mentor.id, mentor, environment.api.role.unitleader);
    }
}
