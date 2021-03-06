import {Injectable} from '@angular/core';
import {PagedResults, Training, TrainingSearchForm} from '../model';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {OutlookService} from './outlook.service';

@Injectable()
export class TrainingsService {

    private cachedTraining: Training;

    constructor(private api: ApiService, private outlookService: OutlookService) {
    }

    create(training: Training): Observable<Training> {
        if (this.outlookService.getToken()) {
            const headers = (new HttpHeaders()).append('Outlook-Authorization', this.outlookService.getToken());

            return this.api.postWithHeaders('trainings/', headers, training, environment.api.role.unitleader);

        } else {
            return this.api.post('trainings/', training, environment.api.role.unitleader);
        }
    }

    delete(training: Training): Observable<void> {
        if (this.outlookService.getToken()) {
            const headers = (new HttpHeaders()).append('Outlook-Authorization', this.outlookService.getToken());

            return this.api.deleteWithHeaders('trainings/' + training.id, headers, environment.api.role.unitleader);

        } else {
            return this.api.deleteMethod('trainings/' + training.id, environment.api.role.unitleader);
        }
    }

    getAllByPage(page: number = 0): Observable<PagedResults<Training>> {
        return this.getPaged(page, 'trainings/paged/', environment.api.role.unitleader);
    }

    private getPaged(page: number, url: string, role: string): Observable<PagedResults<Training>> {
        const resultPageSize = environment.resultsOnPage;
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(url, queryParams, role);
    }

    getEmployeeFinishedByPage(page: number = 0): Observable<PagedResults<Training>> {
        return this.getPaged(page, 'trainings/finished/', environment.api.role.employee);
    }

    getEmployeePlannedByPage(page: number = 0): Observable<PagedResults<Training>> {
        return this.getPaged(page, 'trainings/planned/', environment.api.role.employee);
    }

    getSingleAsEmployee(trainingId: number): Observable<Training> {
        const partialUrl = 'trainings/' + trainingId;

        return this.api.get(partialUrl, environment.api.role.employee);
    }


    getSingleAsUnitLeader(trainingId: number): Observable<Training> {
        const partialUrl = 'trainings/' + trainingId;

        return this.api.get(partialUrl, environment.api.role.unitleader).do(t => this.cachedTraining = t);
    }

    getCachedTraining(trainingId: number): Observable<Training> {
        if (this.cachedTraining && this.cachedTraining.id === trainingId) {
            return Observable.of(this.cachedTraining);

        } else {
            return this.getSingleAsUnitLeader(trainingId);
        }
    }

    search(criteria: TrainingSearchForm, page: number = 0): Observable<PagedResults<Training>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'trainings/search/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.postWithParams(partialUrl, queryParams, criteria, environment.api.role.unitleader);
    }

    update(training: Training): Observable<void> {
        const partialUrl = 'trainings/' + training.id;

        if (this.outlookService.getToken()) {
            const headers = (new HttpHeaders()).append('Outlook-Authorization', this.outlookService.getToken());

            return this.api.putWithHeaders(partialUrl, headers, training, environment.api.role.unitleader);

        } else {
            return this.api.put(partialUrl, training, environment.api.role.unitleader);
        }
    }
}
