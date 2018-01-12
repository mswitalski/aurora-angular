import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Mentor} from '../../../msh/model';
import {Observable} from 'rxjs/Observable';
import {MentorsService} from '../../../msh/service';

@Injectable()
export class MyMentorsListResolver implements Resolve<Mentor[]> {

    constructor(private mentorsService: MentorsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Mentor[]> {
        return this.mentorsService.getAllLoggedUserMentors();
    }
}
