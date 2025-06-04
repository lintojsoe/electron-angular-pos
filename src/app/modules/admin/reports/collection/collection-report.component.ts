import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PrintReportComponent } from 'app/modules/components/print-report/print-report.component';
import { DownloadReportService } from 'app/services/downloadReportService';
import { HomeService } from 'app/services/homeService';
import { PrintService } from 'app/services/printerService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Pagination } from 'app/shared/constants';
import moment from 'moment';
import { debounceTime, map } from 'rxjs/operators';

@Component({
    selector: 'app-collection-report',
    templateUrl: './collection-report.component.html',
    styleUrls: ['./collection-report.component.scss'],
})
export class CollectionReportComponent implements OnInit {
    collectionReport = [];
    page = new Pagination().page;
    isLoading = false;
    form: FormGroup;
    columns: string[] = [
        'plate_no',
        'in_time',
        'out_time',
        'entry_gate',
        'exit_gate',
        'payment_date',
        // 'payment_method',
        'amount',
        'cashier',
        'action',
    ];
    isExportPending: boolean;
    constructor(
        private utilitiesService: UtilitiesService,
        private dialog: MatDialog,
        private homeService: HomeService,
        private fb: FormBuilder,
        private printService: PrintService,
        private downloadReportService: DownloadReportService
    ) { }

    get startDate() {
        return this.form.get('start_date').value;
    }
    get endDate() {
        return this.form.get('end_date').value;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            start_date: [],
            end_date: [],
        });
        this.form.valueChanges.pipe(debounceTime(400)).subscribe((data) => {
            this.page = new Pagination().page;
            this.isLoading = true;
            this.collectionReport = [];
            this.getCollectionReport();
        });
        this.getCollectionReport();
    }

    getFormattedDate() {
        let start_date = this.startDate
            ? moment(new Date(this.startDate)).format('YYYY-MM-DD')
            : '';
        let end_date = this.endDate
            ? moment(new Date(this.endDate)).format('YYYY-MM-DD')
            : '';

        return { start_date, end_date };
    }

    async getCollectionReport() {
        try {
            this.isLoading = true;
            const collection = await this.homeService
                .getHistory(this.getParams())
                .toPromise();
            if (collection) {
                this.page.length = collection.count;
                this.collectionReport = collection.results;
                this.isLoading = false;
            }
        } catch (e) {
            this.isLoading = false;
        } finally {
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    async handlePageEvent(event) {
        this.collectionReport = [];
        this.page.length = event.length;
        this.page.pageSize = event.pageSize;
        this.page.pageIndex = event.pageIndex;
        this.page.offset = this.page.pageIndex * this.page.pageSize;
        this.getCollectionReport();
    }

    viewReport() {
        let size = {
            width: '100%',
            height: '100%',
        };
        const dialogRef = this.dialog.open(PrintReportComponent, {
            data: {},
            maxWidth: '',
            width: `${size.width}`,
            height: `${size.height}`,
            panelClass: 'no-padding',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(async (resp) => {
            if (resp) {
            }
        });
    }

    async printReceipt(reportObject) {
        let config = this.utilitiesService.currentGateConfig$.value
            .pos_configuration
            ? this.utilitiesService.currentGateConfig$.value.pos_configuration
            : null;
        if (config && config.api_print_receipt) {
            console.log(config.api_print_receipt);
            const print = await this.printService
                .printReceipt(config.api_print_receipt, reportObject)
                .toPromise();
            if (print) {
                console.log(print);
            }
        } else {
            this.utilitiesService.showErrorToast(
                'Please contact admin to configure print receipt and open drawer APIs'
            );
        }
    }

    getParams() {
        return {
            limit: this.page.pageSize,
            offset: this.page.offset,
            in_time: this.getFormattedDate().start_date,
            out_time: this.getFormattedDate().end_date,
        };
    }

    exportExcel() {
        try {
            this.isExportPending = true;
            this.homeService
                .getHistoryReport(this.getParams(), 'xls')
                .subscribe(
                    (data) => {
                        this.isExportPending = false;
                        this.downloadReportService.downloadExcel(
                            data,
                            'CollectionReport.xlsx'
                        );
                    },
                    (err) => {
                        this.isExportPending = false;
                        console.log('error');
                        console.error(err);
                    }
                );
        } catch {
            this.isExportPending = false;
        } finally {
        }
    }
}
