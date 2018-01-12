import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PagedResults, Task} from '../../../msh/model';
import {TasksService} from '../../../msh/service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DoneTasksListResolver implements Resolve<PagedResults<Task>> {

    constructor(private tasksService: TasksService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResults<Task>> {
        return this.tasksService.findDoneAsEmployee();
    }
}
