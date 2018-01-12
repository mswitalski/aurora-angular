import {Injectable} from '@angular/core';
import {PagedResults, Task, TasksStatistics} from '../model';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class TasksService {

    private cachedTask: Task;

    constructor(private api: ApiService) {
    }

    create(task: Task): Observable<Task> {
        return this.api.post('tasks/', task, environment.api.role.employee);
    }

    delete(task: Task): Observable<void> {
        return this.api.deleteMethod('tasks/' + task.id, environment.api.role.employee);
    }

    findAllUndoneAsEmployee(): Observable<Task[]> {
        return this.api.get('users/me/tasks/undone/', environment.api.role.employee);
    }

    findAllUndoneAsUnitLeader(userId: number): Observable<Task[]> {
        return this.api.get('users/' + userId + '/tasks/undone/', environment.api.role.unitleader);
    }

    findDoneAsEmployee(page: number = 0): Observable<PagedResults<Task>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'users/me/tasks/done/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams, environment.api.role.employee);
    }

    findDoneAsUnitLeader(userId: number, page: number = 0): Observable<PagedResults<Task>> {
        const resultPageSize = environment.resultsOnPage;
        const partialUrl = 'users/' + userId + '/tasks/done/';
        const queryParams = new HttpParams()
            .set('page', page.toString(10))
            .set('size', resultPageSize.toString(10));

        return this.api.getWithParams(partialUrl, queryParams, environment.api.role.unitleader);
    }

    findStatisticsAsEmployee(): Observable<TasksStatistics> {
        return this.api.get('users/me/tasks/statistics', environment.api.role.employee);
    }

    findStatisticsAsUnitLeader(userId: number): Observable<TasksStatistics> {
        return this.api.get('users/' + userId + '/tasks/statistics', environment.api.role.unitleader);
    }

    getSingle(taskId: number): Observable<Task> {
        const partialUrl = 'tasks/' + taskId;

        return this.api.get(partialUrl, environment.api.role.employee).do(task => this.cachedTask = task);
    }

    getCachedTask(taskId: number): Observable<Task> {
        if (this.cachedTask && this.cachedTask.id === taskId) {
            return Observable.of(this.cachedTask);

        } else {
            return this.getSingle(taskId);
        }
    }

    update(task: Task): Observable<void> {
        return this.api.put('tasks/' + task.id, task, environment.api.role.employee);
    }
}
