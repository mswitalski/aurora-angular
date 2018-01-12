import {User} from './user.model';

export class Training {
    id: number;
    name: string;
    type: string;
    location: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    internal = true;
    users: User[] = [];
}
