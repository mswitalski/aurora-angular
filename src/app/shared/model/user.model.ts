import {Role} from './role.model';

export class User {
    username: string;
    email: string;
    name: string;
    surname: string;
    position: string;
    goals: string;
    enabled: boolean;
    roles: Role[];
}
