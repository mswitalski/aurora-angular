import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Task} from '../../../msh/model';
import {TasksService} from '../../../msh/service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UndoneTasksListResolver implements Resolve<Task[]> {

    constructor(private tasksService: TasksService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
        return this.tasksService.findAllUndoneAsUnitLeader(route.params['userId']);
    }
}
