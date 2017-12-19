import {User} from './user.model';

export class Training {
    id: number;
    name: string;
    type: string;
    location: string;
    startDateTime: string;
    endDateTime: string;
    internal: string;
    users: User[] = [];
}
