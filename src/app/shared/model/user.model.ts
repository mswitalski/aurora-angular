import {Role} from './role.model';

export class User {
    id: number;
    username: string;
    email: string;
    name: string;
    surname: string;
    position: string;
    goals: string;
    enabled: boolean;
    roles: Role[];
}
