import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Feedback, Mentor, PagedResults} from '../../../shared/model';
import {Observable} from 'rxjs/Observable';
import {FeedbackService, MentorsService} from '../../../shared/service';

@Injectable()
export class FeedbackResolver implements Resolve<Feedback[]> {

    constructor(private feedbackService: FeedbackService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Feedback[]> {
        return this.feedbackService.getAllByMentorAsEmployee(route.params['mentorId']);
    }
}
