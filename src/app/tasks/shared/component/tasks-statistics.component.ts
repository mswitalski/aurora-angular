import {Component, Input} from '@angular/core';
import {TasksStatistics} from '../../../shared/model';

@Component({
    selector: 'app-tasks-statistics',
    templateUrl: './tasks-statistics.component.html'
})
export class TasksStatisticsComponent {

    statistics: TasksStatistics;

    @Input() set data(data: TasksStatistics) {
        this.statistics = data;
    }
}
