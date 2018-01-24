import {Component, Input} from '@angular/core';
import {Training} from '../../../msh/model';

@Component({
    selector: 'app-training-details',
    templateUrl: './training-details.component.html'
})
export class TrainingDetailsComponent {

    selectedTraining: Training;
    limits = false;

    @Input() set training(training: Training) {
        this.selectedTraining = training;
    }

    @Input() set showLimits(v: boolean) {
        this.limits = v;
    }
}
