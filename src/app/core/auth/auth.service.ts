import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { UtilitiesService } from 'app/services/utilitiesService';
import { LocalStorageKeys } from 'app/shared/constants';

@Injectable()
export class AuthService {
    public _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        public _userService: UserService,
        private utilitiesService: UtilitiesService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        this.utilitiesService.setStorageItem(
            LocalStorageKeys.AccessToken,
            token
        );
    }

    get accessToken(): string {
        return (
            this.utilitiesService.getStorageItem(
                LocalStorageKeys.AccessToken
            ) ?? ''
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: {
        username: string;
        password: string;
        server_url: string;
    }): Observable<any> {
        debugger
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        let server_url = credentials.server_url ? credentials.server_url:  environment.server_url ;
        console.log(server_url)

        return this._httpClient.post(`${server_url}/api/login/`, credentials);
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient
            .post('api/auth/refresh-access-token', {
                access_token: this.accessToken,
            })
            .pipe(
                catchError(() => {
                    // Return false
                    return of(false);
                }),
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.access_token;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        this.utilitiesService.clearAllLocalStorage();
        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        let isExpired: boolean = false;
        let token = this.utilitiesService.getStorageItem(
            LocalStorageKeys.AccessToken
        );
        console.log(token);
        if (token) {
            return of(true);
            // const helper = new JwtHelperService();
            // isExpired = helper.isTokenExpired(token);
            // if (!isExpired) {
            //     return of(true);
            // } else {
            //     return of(false);
            // }
        } else {
            return of(false);
        }
    }
}
