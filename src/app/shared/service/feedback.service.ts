import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Feedback} from '../model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class FeedbackService {

    constructor(private api: ApiService) {
    }

    create(feedback: Feedback): Observable<Feedback> {
        return this.api.post('feedback/', feedback, environment.api.role.employee);
    }

    delete(feedback: Feedback): Observable<Feedback> {
        return this.api.deleteMethod('feedback/' + feedback.id, environment.api.role.unitleader);
    }

    getAllByMentorAsEmployee(mentorId: number): Observable<Feedback[]> {
        return this.api.get('mentors/' + mentorId + '/feedback/', environment.api.role.employee);
    }

    getAllByMentorAsUnitLeader(mentorId: number): Observable<Feedback[]> {
        return this.api.get('mentors/' + mentorId + '/feedback/', environment.api.role.unitleader);
    }
}
