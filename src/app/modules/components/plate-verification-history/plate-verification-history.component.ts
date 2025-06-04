import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HomeService } from 'app/services/homeService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Pagination } from 'app/shared/constants';
import { VericationPlateStatus } from 'app/shared/constants/verification-plate-status';

@Component({
    selector: 'app-plate-verification-history',
    templateUrl: './plate-verification-history.component.html',
    styleUrls: ['./plate-verification-history.component.scss'],
})
export class PlateVerificationHistoryComponent implements OnInit {
    page = new Pagination().page;
    @Output()
    closeHandler: EventEmitter<any> = new EventEmitter<any>();
    history = [];
    loading = false;
    isLoadingMore: boolean =false;
    constructor(
        private homeService: HomeService,
        private utilitiesService: UtilitiesService
    ) {}

    ngOnInit(): void {
        this.getVerificationHistory();
    }

    async getVerificationHistory() {
        try {
            this.loading = true;
            const history = await this.homeService
                .getVerificationHistory({
                    limit: this.page.pageSize,
                    offset: this.page.offset,
                    status: VericationPlateStatus.APPROVED,
                })
                .toPromise();
            if (history) {
                this.loading = false;
                this.page.length = history.count;
                this.history = history.results;
                this.page.offset = this.history.length;
            }
        } catch {
            this.loading = false;
        } finally {
        }
    }

    close() {
        this.closeHandler.emit();
    }

    checkPagination() {
        return this.page.offset >= this.page.length ? false : true;
    }

    async loadMore() {
        try {
            this.page.offset = this.history.length;
            this.isLoadingMore = true;
            let history = await this.homeService
                .getVerificationHistory({
                    offset: this.page.offset,
                    limit: this.page.pageSize,
                    status: VericationPlateStatus.APPROVED,
                })
                .toPromise();
            if (history) {
                this.isLoadingMore = false;
                this.page.length = history.count;
                this.history = this.history.concat(history.results);
                this.page.offset = this.history.length;
            }
        } catch {
            this.isLoadingMore = false;
        } finally {
        }
    }

    plateNumberCheckFirst(ticket) {
        if (ticket) {
            let finalCountry = ticket.final_country;
            let final_plate_number = ticket.final_plate_number;
            let final_plate_number_prefix = ticket.final_plate_number_prefix;
            let country = ticket.first_entry_log.data.country || null;
            let plate_number = ticket.first_entry_log.data.plate_number || null;
            let plate_number_prefix =
                ticket.first_entry_log.data.plate_number_prefix || null;

            if (
                finalCountry == country &&
                final_plate_number == plate_number &&
                final_plate_number_prefix == plate_number_prefix
            ) {
                return true;
            }
            return false;
        }

        return false;
    }
    plateNumberCheckSecond(ticket) {
        if (ticket) {
            let finalCountry = ticket.final_country;
            let final_plate_number = ticket.final_plate_number;
            let final_plate_number_prefix = ticket.final_plate_number_prefix;

            //firstEntryCallTicket
            let country = ticket.first_entry_log.data.country || null;
            let plate_number = ticket.first_entry_log.data.plate_number || null;
            let plate_number_prefix =
                ticket.first_entry_log.data.plate_number_prefix || null;

            //secondEntryCallTicket
            let country2 = ticket.second_entry_log.data.country || null;
            let plate_number2 =
                ticket.second_entry_log.data.plate_number || null;
            let plate_number_prefix2 =
                ticket.second_entry_log.data.plate_number_prefix || null;

            if (
                finalCountry == country &&
                final_plate_number == plate_number &&
                final_plate_number_prefix == plate_number_prefix
            ) {
                return false;
            } else if (
                finalCountry == country2 &&
                final_plate_number == plate_number2 &&
                final_plate_number_prefix == plate_number_prefix2
            ) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    }
}
