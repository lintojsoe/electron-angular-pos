import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root',
})
export class PrintService {
    constructor(private apiService: ApiService) {}

    openDrawer(url: any) {
        return this.apiService.get(url, undefined, undefined, true, true);
    }
    printReceipt(url: any, form: any) {
        return this.apiService.post(url, form, undefined, true, true);
    }
}
