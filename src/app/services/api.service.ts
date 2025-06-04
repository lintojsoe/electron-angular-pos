import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesService } from './utilitiesService';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { TranslationService } from './translation.service';
import { IpcRenderer, ipcRenderer } from 'electron';
import moment from 'moment';
import { LocalStorageKeys } from 'app/shared/constants';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    BASE_URL = '';
    SERVER_URL = '';

    private headersObject = {};
    token: string;
    private _ipc: IpcRenderer | undefined;
    constructor(
        private httpClient: HttpClient,
        public utilitiesService: UtilitiesService,
        public translationService: TranslationService,
        private translateService: TranslateService,
        private router: Router,
        private injector: Injector
    ) {
        if (this.isElectron()) {
            this._ipc = window.require('electron').ipcRenderer;
        }
        this.token = this.utilitiesService.getStorageItem(
            LocalStorageKeys.AccessToken
        );

        this.headersObject = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
        };
    }

    isElectron() {
        if (
            typeof process !== 'undefined' &&
            typeof process.versions === 'object' &&
            !!process.versions.electron
        ) {
            return true;
        }

        return false;
    }
    public get(
        path: string,
        params: HttpParams = new HttpParams(),
        headersObject: object = {},
        showError = true,
        replacePath = false,
        replaceHeader = false,
        isExcel = false
    ): Observable<any> {
        let baseURL = this.utilitiesService.getStorageItem(
            LocalStorageKeys.ServerURL
        );
        this.BASE_URL = baseURL ? baseURL : environment.server_url;

        this.headersObject = {};
        const headers = replaceHeader
            ? new HttpHeaders({
                  ...headersObject,
              })
            : new HttpHeaders({
                  ...headersObject,
                  ...this.headersObject,
              });

        const options = {
            headers,
            params,
        };

        let fullURL = replacePath ? path : `${this.BASE_URL}${path}`;
        if (!isExcel) {
            return this.httpClient
                .get(fullURL, options)
                .pipe(
                    catchError((response) =>
                        this.formatErrors(response, path, false, showError)
                    )
                );
        } else {
            return this.httpClient
                .get(fullURL, {
                    headers: options.headers,
                    params: options.params,
                    responseType: 'blob',
                })
                .pipe(
                    catchError((response) =>
                        this.formatErrors(response, path, false, showError)
                    )
                );
        }
    }

    public put(
        path: string,
        body: object = {},
        params: HttpParams = new HttpParams(),
        headersObject: object = {},
        showError = true,
        replacePath = false,
        replaceHeader = false
    ): Observable<any> {
        let baseURL = this.utilitiesService.getStorageItem(
            LocalStorageKeys.ServerURL
        );
        this.BASE_URL = baseURL ? baseURL : environment.server_url;

        const headers = replaceHeader
            ? new HttpHeaders({
                  ...headersObject,
              })
            : new HttpHeaders({
                  ...headersObject,
                  ...this.headersObject,
              });

        const options = {
            headers: headersObject == null ? {} : headers,
            params,
        };

        return this.httpClient
            .put(this.BASE_URL + path, body, options)
            .pipe(
                catchError((response) =>
                    showError
                        ? this.formatErrors(response, path)
                        : throwError(response)
                )
            );
    }

    public patch(
        path: string,
        body: object = {},
        params: HttpParams = new HttpParams(),
        headersObject: object = {},
        showError = true,
        replacePath = false,
        replaceHeader = false
    ): Observable<any> {
        let baseURL = this.utilitiesService.getStorageItem(
            LocalStorageKeys.ServerURL
        );
        this.BASE_URL = baseURL ? baseURL : environment.server_url;
        const headers = replaceHeader
            ? new HttpHeaders({
                  ...headersObject,
              })
            : new HttpHeaders({
                  ...headersObject,
                  ...this.headersObject,
              });

        const options = {
            headers,
            params,
        };

        return this.httpClient
            .patch(this.BASE_URL + path, body, options)
            .pipe(
                catchError((response) =>
                    showError
                        ? this.formatErrors(response, path)
                        : throwError(response)
                )
            );
    }

    public post(
        path: string,
        body: object = {},
        headersObject: object = {},
        showError = true,
        replacePath = false,
        replaceHeader = false
    ): Observable<any> {
        let baseURL = this.utilitiesService.getStorageItem(
            LocalStorageKeys.ServerURL
        );
        this.BASE_URL = baseURL ? baseURL : environment.server_url;
        const headers = replaceHeader
            ? new HttpHeaders({
                  ...headersObject,
              })
            : new HttpHeaders({
                  ...headersObject,
                  ...this.headersObject,
              });

        const options = {
            headers,
        };
        let fullURL = replacePath ? path : `${this.BASE_URL}${path}`;
        return this.httpClient
            .post(fullURL, body, options)
            .pipe(
                catchError((response) =>
                    showError
                        ? this.formatErrors(response, path)
                        : throwError(response)
                )
            );
    }

    public delete(
        path: string,
        headersObject: object = {},
        showError = true,
        replacePath = false,
        replaceHeader = false
    ): Observable<any> {
        let baseURL = this.utilitiesService.getStorageItem(
            LocalStorageKeys.ServerURL
        );
        this.BASE_URL = baseURL ? baseURL : environment.server_url;
        const headers = replaceHeader
            ? new HttpHeaders({
                  ...headersObject,
              })
            : new HttpHeaders({
                  ...headersObject,
                  ...this.headersObject,
              });

        const options = {
            headers,
        };

        return this.httpClient
            .delete((replacePath ? '' : this.BASE_URL) + path, options)
            .pipe(
                catchError((response) =>
                    showError
                        ? this.formatErrors(response, path)
                        : throwError(response)
                )
            );
    }

    async formatErrors(
        errorResponse: any,
        path: any,
        throwGeneric = false,
        showError = true
    ): Promise<Observable<any>> {
        console.log('Error response', errorResponse);
        let message = this.translationService.getTranslatedField(
            errorResponse.error,
            'error'
        );
        if (message == 'Invalid request data') {
            message = '';
        }
        if ((throwGeneric || !message) && showError) {
            this.translateService
                .get('API general error')
                .subscribe((translatedMessage) => {
                    if (JSON.stringify(errorResponse.error)) {
                        this.log(JSON.stringify(errorResponse.error), path);
                        this.utilitiesService.showErrorToast(
                            JSON.stringify(errorResponse.error)
                        );
                    } else {
                        this.log(errorResponse.error, path);
                        this.utilitiesService.showErrorToast(
                            errorResponse.error
                        );
                    }
                });
        } else {
            this.utilitiesService.showErrorToast(message);
        }

        if (errorResponse.status == 403) {
            // this.unAuthorized(errorResponse);
        }

        throw throwError(errorResponse);
    }

    log(error: string, apiURL: string = '') {
        if (this.isElectron()) {
            let errorObejct = {
                date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                error: error,
                apiURL: apiURL,
            };
            this._ipc.send('write-error-log', errorObejct);
        }
    }
    async unAuthorized(errorResponse) {
        if (errorResponse.failure_url) {
            this.router.navigate([errorResponse.failure_url]);
        } else {
            this.router.navigate(['not-found']);
        }
    }
}
