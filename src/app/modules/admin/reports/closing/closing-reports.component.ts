import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'app/core/user/user.service';
import { ClosingReportComponent } from 'app/modules/components/closing-report/closing-report.component';
import { PrintReportComponent } from 'app/modules/components/print-report/print-report.component';
import { HomeService } from 'app/services/homeService';
import { TranslationService } from 'app/services/translation.service';
import { UsersService } from 'app/services/usersService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { AlertModalComponent } from 'app/shared/components/alert-modal/alert-modal.component';
import { LocalStorageKeys, Pagination } from 'app/shared/constants';
import { Groups } from 'app/shared/constants/groups';
import { DownloadReportService } from 'app/services/downloadReportService';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-closing-reports',
    templateUrl: './closing-reports.component.html',
    styleUrls: ['./closing-reports.component.scss'],
})
export class ClosingReportsComponent implements OnInit {
    @ViewChild('createReport') createReport;
    closingReport = [];
    page = new Pagination().page;
    isLoading = false;
    columns: string[] = [
        'cashier',
        'opening_balance',
        'total_collection',
        'withdrawal',
        'closing_balance',
        'total_tickets',
        'action',
    ];
    users = [];

    form: FormGroup;

    get isManager() {
        return this.userService.checkManager();
    }
    constructor(
        private dialog: MatDialog,
        private homeService: HomeService,
        public translationService: TranslationService,
        public userService: UserService,
        private usersService: UsersService,
        private translateService: TranslateService,
        private utilitiesService: UtilitiesService,
        private fb: FormBuilder,
        private downloadReportService: DownloadReportService
    ) {}

    ngOnInit(): void {
        this.formInit();
        this.getAllUsers();
        this.getClosingReport();
    }

    formInit() {
        this.form = this.fb.group({
            cashier_id: [null, Validators.required],
            opening_balance: 0.0,
        });
    }

    async getAllUsers() {
        try {
            const users = await this.usersService
                .getUserList({ limit: 999999, offset: 0, groups: Groups.POS })
                .toPromise();
            if (users) {
                this.users = users.results;
            }
        } catch {
        } finally {
        }
    }

    toggle() {
        this.createReport.toggle();
    }

    resetPagination() {
        this.page = new Pagination().page;
    }

    async createReportFn() {
        if (this.form.valid) {
            try {
                let form = this.form.value;
                const createReport = await this.homeService
                    .createClosingReport(form)
                    .toPromise();
                if (createReport) {
                    let msg = this.translateService.instant(
                        'Report created successfully'
                    );
                    this.utilitiesService.showSuccessToast(msg);
                    this.resetPagination();
                    this.toggle();
                    this.getClosingReport();
                }
            } catch {
            } finally {
            }
        }
    }

    getParams() {
        return {
            limit: this.page.pageSize,
            offset: this.page.offset,
        };
    }

    addReport() {
        this.toggle();
    }

    async getClosingReport() {
        try {
            this.isLoading = true;
            const closingReport = await this.homeService
                .getClosingReport(this.getParams())
                .toPromise();
            if (closingReport) {
                this.page.length = closingReport.count;
                this.closingReport = closingReport.results;
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
        this.closingReport = [];
        this.page.length = event.length;
        this.page.pageSize = event.pageSize;
        this.page.pageIndex = event.pageIndex;
        this.page.offset = this.page.pageIndex * this.page.pageSize;
        this.getClosingReport();
    }

    viewReport(id) {
        try {
            this.homeService.downloadClosignReport(id).subscribe(
                (data) => {
                    this.downloadReportService.downloadExcel(
                        data,
                        'ClosingReport.pdf'
                    );
                },
                (err) => {
                    console.log('error');
                    console.error(err);
                }
            );
        } catch {
        } finally {
        }
    }

    deleteReport(id) {
        let content = this.translateService.instant(
            'Are you sure, Do you want to delete this report ?'
        );
        let heading = this.translateService.instant('Delete');
        let size = this.utilitiesService.isMobileAlertModal();
        const dialogRef = this.dialog.open(AlertModalComponent, {
            data: { heading, content },
            maxWidth: '',
            width: `${size.width}`,
            height: `${size.height}`,
            panelClass: 'no-padding',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(async (resp) => {
            if (resp) {
                try {
                    this.homeService.deleteClosingReport(id).subscribe(
                        (data) => {
                            let msg = this.translateService.instant(
                                'Report deleted successfully'
                            );
                            this.utilitiesService.showSuccessToast(msg);
                            this.getClosingReport();
                        },
                        (error) => {}
                    );
                } catch {
                } finally {
                }
            }
        });
    }
}
