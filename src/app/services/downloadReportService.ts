import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as FileSaver from 'file-saver';
@Injectable({
    providedIn: 'root',
})
export class DownloadReportService {
    constructor() {}

    downloadExcel(data, name) {
        FileSaver.saveAs(data, name);
    }
}
