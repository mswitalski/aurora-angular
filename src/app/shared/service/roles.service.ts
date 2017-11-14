import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

import {Role} from '../model';
import {environment} from '../../../environments/environment';

@Injectable()
export class RolesService {

    constructor(private api: ApiService) {
    }

    getAll(): Observable<Role[]> {
        return this.api.get('roles/', environment.api.role.admin).map(response => response.body);
    }
}
