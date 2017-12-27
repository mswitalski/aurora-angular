import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TasksStatistics} from '../../../shared/model';
import {TasksService} from '../../../shared/service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TasksStatisticsResolver implements Resolve<TasksStatistics> {

    constructor(private tasksService: TasksService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TasksStatistics> {
        return this.tasksService.findStatisticsAsEmployee();
    }
}
