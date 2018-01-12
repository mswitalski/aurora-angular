import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Feedback} from '../../../msh/model';
import {Observable} from 'rxjs/Observable';
import {FeedbackService} from '../../../msh/service';

@Injectable()
export class FeedbackResolver implements Resolve<Feedback[]> {

    constructor(private feedbackService: FeedbackService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Feedback[]> {
        return this.feedbackService.getAllByMentorAsUnitLeader(route.params['mentorId']);
    }
}
