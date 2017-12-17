import {Mentor} from './mentor.model';
import {User} from './user.model';

export class Feedback {
    id: number;
    mentor: Mentor;
    user: User;
    satisfied: boolean;
    studentFeedback = '';
    createDateTime: string;
}
