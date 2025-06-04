import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslationService } from 'app/services/translation.service';
import { UtilitiesService } from 'app/services/utilitiesService';
import { WebSocketService } from 'app/services/websocketService';
import { delay } from 'rxjs/internal/operators';
import { ModifyPlateVerificationPopoverComponent } from 'app/shared/components/modify-plate-verification-popover/modify-plate-verification-popover.component';
import { retryWhen, tap } from 'rxjs/operators';
import { ApiService } from 'app/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertModalComponent } from 'app/shared/components/alert-modal/alert-modal.component';
import { HomeService } from 'app/services/homeService';
import { VericationPlateStatus } from 'app/shared/constants/verification-plate-status';

@Component({
    selector: 'app-plate-verfication',
    templateUrl: './plate-verfication.component.html',
    styleUrls: ['./plate-verfication.component.scss'],
})
export class PlateVerficationComponent implements OnInit {
    @ViewChild('historyPopup') historyPopup;
    vehicleList = [];
    constructor(
        public translationService: TranslationService,
        private utilitiesService: UtilitiesService,
        private dialog: MatDialog,
        private webSocketService: WebSocketService,
        private apiService: ApiService,
        private translateService: TranslateService,
        private homeService: HomeService
    ) {}

    ngOnInit(): void {
        this.getLiveVerification();
    }

    get direction() {
        return this.translationService.getDirection();
    }

    bindDataToView = (data) => {
        console.log(data);
        if (data && data.logs && data.logs.length) {
            this.utilitiesService.showNewTicketNotification(
                'New Verification Available'
            );
            data.logs.forEach((items) => {
                this.vehicleList.push(items);
            });
            const uniqueData =
                [
                    ...this.vehicleList
                        .reduce((map, obj) => map.set(obj.id, obj), new Map())
                        .values(),
                ] || [];
            this.vehicleList = [...uniqueData];
            this.sortByDate();
        }
    };

    sortByDate() {
        this.vehicleList = this.vehicleList.sort((a, b) => {
            return (
                <any>new Date(b.first_entry_log.data.in_time) -
                <any>new Date(a.first_entry_log.data.in_time)
            );
        });
    }

    getLiveVerification() {
        this.webSocketService
            .getPlateVerificationWebSocket()
            .pipe(
                tap((data) =>
                    this.bindDataToView(
                        typeof data == 'string' ? JSON.parse(data) : data
                    )
                ),
                retryWhen((errors) => {
                    console.log(errors);
                    this.apiService.log(
                        `WebSocket connection to [ ${this.webSocketService.getPlateVerificationWebSocketURL()} ] failed`
                    );
                    return errors.pipe(delay(3000));
                })
            )
            .subscribe((data) => {});
    }

    toggleHistory(force) {
        this.historyPopup.toggle();
    }

    closeHandler() {
        this.toggleHistory(true);
    }

    modify(ticketObject) {
        let isMobile = this.utilitiesService.isMobile();
        let size = {
            width: '100%',
            height: '100%',
        };
        if (isMobile) {
            size.height = '100%';
            size.width = '100%';
        }
        const dialogRef = this.dialog.open(
            ModifyPlateVerificationPopoverComponent,
            {
                data: { ticketObject },
                maxWidth: '',
                width: `${size.width}`,
                height: `${size.height}`,
            }
        );

        dialogRef.afterClosed().subscribe(async (id) => {
            if (id) {
                this.vehicleList = this.vehicleList.filter(
                    (data) => data.id != id
                );
            }
        });
    }

    approve(ticketObject) {
        console.log(ticketObject);
        let content = this.translateService.instant(
            'Are you sure, Do you want to approve this vehicle ?'
        );
        let heading = this.translateService.instant('Approve');
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
                    let form = {
                        final_country:
                            ticketObject.first_entry_log.data.country || null,
                        final_plate_number_prefix:
                            ticketObject.first_entry_log.data
                                .plate_number_prefix || null,
                        final_plate_number:
                            ticketObject.first_entry_log.data.plate_number ||
                            null,
                        id: ticketObject.id,
                        status: VericationPlateStatus.APPROVED,
                    };
                    this.homeService.approveVehicle(form).subscribe(
                        (data) => {
                            let msg = this.translateService.instant(
                                'Vehicle approved successfully'
                            );
                            this.utilitiesService.showSuccessToast(msg);
                            this.vehicleList = this.vehicleList.filter(
                                (data) => data.id != form.id
                            );
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
