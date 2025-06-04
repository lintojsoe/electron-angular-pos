import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { delay, filter, map, retryWhen, switchMap, tap } from 'rxjs/operators';
import * as Rx from 'rxjs/Rx';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { UtilitiesService } from './utilitiesService';
import { LocalStorageKeys } from 'app/shared/constants';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    isConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor(
        private api: ApiService,
        private utilitiesService: UtilitiesService
    ) {}

    getWebSocket(): WebSocketSubject<any> {
        let gate_id = this.utilitiesService.getParsedGateObject()
            ? this.utilitiesService.getParsedGateObject().id
            : null;
        let token = localStorage.getItem(LocalStorageKeys.AccessToken);
        return webSocket(
            `${this.getWebSocketURL()}?bearer=${token}&gate_id=${gate_id}`
        );
    }

    getWebSocketURL() {
        return `ws://${this.stripHttp()}/ws/operation/live-exit-tickets/`;
    }

    getPlateVerificationWebSocketURL() {
        return `ws://${this.stripHttp()}/ws/operation/vigilant-double-auth-logs/`;
    }

    getPlateVerificationWebSocket(): WebSocketSubject<any> {
        let gate_id = this.utilitiesService.getParsedGateObject()
            ? this.utilitiesService.getParsedGateObject().id
            : null;
        let token = localStorage.getItem(LocalStorageKeys.AccessToken);
        return webSocket(
            `${this.getPlateVerificationWebSocketURL()}?bearer=${token}&gate_id=${gate_id}`
        );
    }

    stripHttp() {
        let serverURL = this.utilitiesService.getStorageItem(
            LocalStorageKeys.ServerURL
        );
        let url: any = null;
        if (serverURL) {
            url = serverURL.replace(/(^\w+:|^)\/\//, '');
        } else {
            url = environment.server_url.replace(/(^\w+:|^)\/\//, '');
        }
        return url;
    }
}
