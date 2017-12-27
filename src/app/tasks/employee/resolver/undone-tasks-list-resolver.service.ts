import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Task} from '../../../shared/model';
import {TasksService} from '../../../shared/service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UndoneTasksListResolver implements Resolve<Task[]> {

    constructor(private tasksService: TasksService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
        return this.tasksService.findAllUndoneAsEmployee();
    }
}
