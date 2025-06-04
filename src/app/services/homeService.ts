import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'app/shared/constants';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(private api: ApiService, private httpClient: HttpClient) {}

    getActiveTickets(queryParams: any = {}) {
        return this.api.get(API_URLS.ActiveTickets, queryParams, undefined);
    }

    getPaymentModes(queryParams: any = {}) {
        return this.api.get(API_URLS.PaymentModes, queryParams, undefined);
    }

    getTicketsDetail(id: number) {
        return this.api.get(`${API_URLS.Tickets}${id}/`, undefined, undefined);
    }

    getReasons(queryParams: any = {}) {
        return this.api.get(`${API_URLS.Reasons}`, queryParams, undefined);
    }

    getHistory(queryParams: any = {}) {
        return this.api.get(`${API_URLS.History}`, queryParams, undefined);
    }

    downloadClosignReport(id: any) {
        let headersObject = {
            'Content-Type': 'application/json',
        };
        return this.api.get(
            `${API_URLS.ClosingReport}${id}/pdf/`,
            undefined,
            headersObject,
            true,
            false,
            true,
            true
        );
    }

    getHistoryReport(queryParams: any = {}, type: string = '') {
        let headersObject = {
            'Content-Type': 'application/vnd.ms-excel',
        };
        return this.api.get(
            `${API_URLS.History}?report=${type}`,
            queryParams,
            headersObject,
            true,
            false,
            true,
            true
        );
    }

    getClosingReport(queryParams: any = {}) {
        return this.api.get(API_URLS.ClosingReport, queryParams, undefined);
    }

    createClosingReport(form: any) {
        return this.api.post(API_URLS.ClosingReport, form, undefined);
    }

    createLOT(form: any) {
        return this.api.post(API_URLS.CreateLOT, form, undefined);
    }

    deleteClosingReport(id: number) {
        return this.api.delete(`${API_URLS.ClosingReport}${id}/`);
    }

    updatePlateNumber(form: any, id: number) {
        return this.api.put(
            `${API_URLS.PlateVerification}${id}/modify/`,
            form,
            undefined
        );
    }

    approveVehicle(form) {
        return this.api.patch(`${API_URLS.PlateVerification}${form.id}/`, form);
    }

    getHistoryDetail(id: number) {
        return this.api.get(`${API_URLS.History}${id}/`, undefined, undefined);
    }

    getVerificationHistory(queryParams: any = {}) {
        return this.api.get(
            `${API_URLS.PlateVerification}`,
            queryParams,
            undefined
        );
    }

    getVehicles(queryParams: any = {}) {
        return this.api.get(API_URLS.History, queryParams, undefined);
    }

    searchTickets(queryParams: any = {}, form) {
        return this.api.post(
            `${API_URLS.searchTickets}?limit=${queryParams.limit}&offset=${queryParams.offset}`,
            form,
            undefined
        );
    }

    postCollectCash(form) {
        return this.api.post(
            `${API_URLS.CollectCash}${form.id}/make-payment/`,
            form,
            undefined
        );
    }

    getGates(queryParams: any = {}, token = null) {
        let headersObject = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        return this.api.get(
            API_URLS.Gates,
            queryParams,
            token ? headersObject : undefined,
            false,
            false,
            token ? true : false
        );
    }

    getConfig(id, token = null) {
        let headersObject = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        return this.api.get(
            `${API_URLS.Gates}${id}/`,
            undefined,
            token ? headersObject : undefined,
            false,
            false,
            token ? true : false
        );
    }

    patchConfig(id: any, form: any, token = null) {
        let headersObject = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        return this.api.patch(
            `${API_URLS.Gates}${id}/`,
            form,
            undefined,
            token ? headersObject : undefined,
            true,
            false,
            token ? true : false
        );
    }
}
