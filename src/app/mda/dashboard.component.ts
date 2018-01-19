import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {AuthService, OutlookService, TasksService, TrainingsService} from '../msh/service';
import {AutoUnsubscriberComponent, Task} from '../msh';
import {ActivatedRoute} from '@angular/router';
import {ListEventData, PagedResults, Training, User} from '../msh/model';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends AutoUnsubscriberComponent {

    tasksList: Task[] = [];
    plannedPagedResults = new PagedResults<Training>();
    plannedTrainingsList: Training[] = [];
    loggedUser: User;
    currentTime = new Date();

    constructor(private authService: AuthService,
                private tasksService: TasksService,
                private trainingsService: TrainingsService,
                private activatedRoute: ActivatedRoute,
                private outlookService: OutlookService) {
        super();
        this.processUrlFragment();
        this.populateData();
        this.authService.loggedUser.takeUntil(this.ngUnsubscribe).subscribe(u => this.loggedUser = u);
        Observable.interval(1000).takeUntil(this.ngUnsubscribe).subscribe(() => this.currentTime = new Date());
    }

    private processUrlFragment(): void {
        this.activatedRoute.fragment.takeUntil(this.ngUnsubscribe).subscribe(
            (fragment: string) => {
                if (fragment && fragment.search('state=outlook') !== -1) {
                    this.outlookService.processResponse(fragment);
                }
            }
        );
    }

    private populateData(): void {
        this.authService.hasEmployeeRole.takeUntil(this.ngUnsubscribe).subscribe(
            (is: boolean) => {
                if (is) {
                    this.tasksService.findAllUndoneAsEmployee().subscribe(t => this.tasksList = t);
                    this.trainingsService.getEmployeePlannedByPage().subscribe(
                        tr => {
                            this.plannedPagedResults = tr;
                            this.plannedTrainingsList = this.plannedPagedResults.content;
                        }
                    );
                }
            }
        );
    }

    loadPlannedListData(eventData: ListEventData): void {
        this.trainingsService.getEmployeePlannedByPage(eventData.page).subscribe(
            data => {
                this.plannedTrainingsList = data.content;
                this.plannedPagedResults = data;
            });
    }
}
