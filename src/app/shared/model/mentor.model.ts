import {Evaluation} from './evaluation.model';

export class Mentor {
    id: number;
    evaluation: Evaluation;
    approved = false;
    active = false;
}
