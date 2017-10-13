import {Duty, Role} from './';

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    surname: string;
    position: string;
    goals: string;
    enabled = false;
    roles: Role[] = [];
    duties: Duty[] = [];
}
