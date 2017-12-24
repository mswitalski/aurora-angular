import {Injectable} from '@angular/core';
import {Evaluation, User} from '../model';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class EvaluationsService {

    private cachedEvaluation: Evaluation;

    constructor(private api: ApiService) {
    }

    createAsEmployee(evaluation: Evaluation): Observable<Evaluation> {
        return this.api.post('evaluations/', evaluation, environment.api.role.employee);
    }

    createAsUnitLeader(evaluation: Evaluation): Observable<Evaluation> {
        return this.api.post('evaluations/', evaluation, environment.api.role.unitleader);
    }

    deleteAsEmployee(evaluation: Evaluation): Observable<void> {
        return this.api.deleteMethod('evaluations/' + evaluation.id, environment.api.role.employee);
    }

    deleteAsUnitLeader(evaluation: Evaluation): Observable<any> {
        return this.api.deleteMethod('evaluations/' + evaluation.id, environment.api.role.unitleader);
    }

    getAllByUserAsEmployee(user: User): Observable<Evaluation[]> {
        const partialUrl = 'users/' + user.id + '/evaluations/';

        return this.api.get(partialUrl, environment.api.role.employee);
    }

    getAllByUserAsUnitLeader(userId: number): Observable<Evaluation[]> {
        const partialUrl = 'users/' + userId + '/evaluations/';

        return this.api.get(partialUrl, environment.api.role.unitleader);
    }

    getSingleAsEmployee(evaluationId: number): Observable<Evaluation> {
        const partialUrl = 'evaluations/' + evaluationId;

        return this.api.get(partialUrl, environment.api.role.employee).do(evaluation => this.cachedEvaluation = evaluation);
    }

    getSingleAsUnitLeader(evaluationId: number): Observable<Evaluation> {
        const partialUrl = 'evaluations/' + evaluationId;

        return this.api.get(partialUrl, environment.api.role.unitleader).do(evaluation => this.cachedEvaluation = evaluation);
    }

    getCachedEvaluationAsEmployee(evaluationId: number): Observable<Evaluation> {
        if (this.cachedEvaluation && this.cachedEvaluation.id === evaluationId) {
            return Observable.of(this.cachedEvaluation);

        } else {
            return this.getSingleAsEmployee(evaluationId);
        }
    }

    getCachedEvaluationAsUnitLeader(evaluationId: number): Observable<Evaluation> {
        if (this.cachedEvaluation && this.cachedEvaluation.id === evaluationId) {
            return Observable.of(this.cachedEvaluation);

        } else {
            return this.getSingleAsUnitLeader(evaluationId);
        }
    }

    updateAsEmployee(evaluation: Evaluation): Observable<void> {
        return this.api.put('evaluations/' + evaluation.id, evaluation, environment.api.role.employee);
    }

    updateAsUnitLeader(evaluation: Evaluation): Observable<void> {
        return this.api.put('evaluations/' + evaluation.id, evaluation, environment.api.role.unitleader);
    }
}
