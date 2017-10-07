import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {Role} from '../model/role.model';

@Injectable()
export class RolesService {

    constructor(private api: ApiService) {
    }

    getAll(): Observable<Role[]> {
        return this.api.get('roles/').map(response => response.body);
    }
}
