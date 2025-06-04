import { Injectable } from '@angular/core';
import { API_URLS } from 'app/shared/constants';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private api: ApiService) {}

    getUserList(queryParams: any = {}) {
        return this.api.get(API_URLS.Users, queryParams);
    }

    getGroups(queryParams: any = {}) {
        return this.api.get(API_URLS.Groups, queryParams);
    }

    saveUser(form) {
        return this.api.post(API_URLS.Users, form);
    }

    updateUser(form) {
        return this.api.patch(`${API_URLS.Users}${form.id}/`, form);
    }

    deleteUser(id) {
        return this.api.delete(`${API_URLS.Users}${id}/`);
    }
}
