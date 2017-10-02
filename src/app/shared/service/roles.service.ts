import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {HttpResponse} from '@angular/common/http';
import {Role} from '../model/role.model';

@Injectable()
export class RolesService {

    constructor(private api: ApiService) {
    }

    getAll(): Observable<HttpResponse<Role[]>> {
        return this.api.get('roles/');
    }
}
