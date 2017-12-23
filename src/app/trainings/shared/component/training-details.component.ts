import {Component, Input} from '@angular/core';
import {Training} from '../../../shared/model';

@Component({
    selector: 'app-training-details',
    templateUrl: './training-details.component.html'
})
export class TrainingDetailsComponent {

    selectedTraining: Training;

    @Input() set training(training: Training) {
        this.selectedTraining = training;
    }
}
