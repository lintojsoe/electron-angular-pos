import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'app/core/user/user.model';
import { Groups } from 'app/shared/constants/groups';
import { LocalStorageKeys } from 'app/shared/constants';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    userDetails(): any {
        const user = localStorage.getItem(LocalStorageKeys.User)
            ? JSON.parse(localStorage.getItem(LocalStorageKeys.User))
            : null;
        return user;
    }

    checkManager(userObject: any = null) {
        let user = null;
        let isManager = false;
        if (!userObject) {
            user = localStorage.getItem(LocalStorageKeys.User)
                ? JSON.parse(localStorage.getItem(LocalStorageKeys.User))
                : null;
        } else {
            user = userObject;
        }

        if (user) {
            if (user.groups && user.groups.length) {
                user.groups.filter((data) => {
                    if (data.id == Groups.MANAGER) {
                        isManager = true;
                    }
                });
            }
        }

        return isManager;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                // Execute the observable
                this._user.next(response);
            })
        );
    }
}
