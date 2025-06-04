import {
    ChangeDetectorRef,
    Component,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { TicketsComponent } from 'app/modules/components/tickets/tickets.component';
import { VehicleDetailComponent } from 'app/modules/components/vehicle-detail/vehicle-detail.component';
import { HomeService } from 'app/services/homeService';
import { TranslationService } from 'app/services/translation.service';
import { UsersService } from 'app/services/usersService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { WebSocketService } from 'app/services/websocketService';
import { CollectSuccessPopupComponent } from 'app/shared/components/collect-success-popup/collect-success-popup.component';
import { debounceTime, retryWhen, takeUntil, tap } from 'rxjs/operators';
import { Groups } from 'app/shared/constants/groups';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';
import { Subject, Subscription } from 'rxjs';
import { PaymentStatus } from 'app/shared/constants/payment_status';
import { delay } from 'rxjs/internal/operators';
import { PaymentSectionComponent } from 'app/modules/components/payment-section/payment-section.component';
import moment from 'moment';
import { Pagination } from 'app/shared/constants';
import { SearchResultsComponent } from 'app/modules/components/search-results/search-results.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild('historyPopup') historyPopup;
    @ViewChild(TicketsComponent) ticketsComponent: TicketsComponent;
    @ViewChild(PaymentSectionComponent)
    paymentComponent: PaymentSectionComponent;
    @ViewChild(SearchResultsComponent)
    searchResultsComponent: SearchResultsComponent;
    page = new Pagination().page;
    loadingSearch = false;
    isCash: boolean = false;
    isLoading: boolean = false;
    form: FormGroup;
    vehicleList = [];
    selectedVehicle: any = null;
    liveTickets = [];
    userGroup = Groups;
    isSearch = false;
    paymentStatus = PaymentStatus;
    searchTicketCount = 0;

    get isManager() {
        if (this.user && this.user.groups && this.user.groups.length) {
            return (
                this.user.groups.filter(
                    (data) =>
                        data.id == this.userGroup.MANAGER ||
                        data.id == this.userGroup.VIGILANT
                )[0] || false
            );
        }
    }

    get user() {
        return this.userService.userDetails();
    }
    get plateNo() {
        return this.form.get('plate_number').value;
    }

    get plate_number_prefix() {
        return this.form.get('plate_number_prefix').value;
    }

    get country() {
        return this.form.get('country').value;
    }

    get isReset() {
        if (
            this.plateNo ||
            this.plate_number_prefix ||
            this.country ||
            this.vehicleList.length ||
            this.selectedVehicle
        ) {
            return true;
        }

        return false;
    }

    get direction() {
        return this.translationService.getDirection();
    }

    constructor(
        public utilitiesService: UtilitiesService,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private homeService: HomeService,
        private webSocketService: WebSocketService,
        private cdr: ChangeDetectorRef,
        private userService: UserService,
        public translationService: TranslationService,
        private apiService: ApiService
    ) {}

    async paginateSearchResults(vehicle) {
        try {
            this.loadingSearch = true;
            this.isSearch = true;
            let form = this.form.value;
            const vehicles = await this.homeService
                .searchTickets(
                    {
                        offset: this.page.offset,
                        limit: this.page.pageSize,
                    },
                    form
                )
                .toPromise();
            if (vehicles) {
                this.loadingSearch = false;
                this.page.length = vehicles.count;
                this.searchTicketCount = vehicles.count;
                this.vehicleList = this.vehicleList.concat(vehicles.results);
                this.page.offset = this.vehicleList.length;
                if (this.searchResultsComponent) {
                    this.searchResultsComponent.isLoading = false;
                }
                console.log(this.page.offset);
            }
        } catch (e) {
            this.loadingSearch = false;
            this.isSearch = false;
        } finally {
        }
    }

    bindDataToView = (data) => {
        console.log(data);
        if (data && data.tickets && data.tickets.length) {
            this.utilitiesService.showNewTicketNotification(
                'New Ticket Arrived'
            );
            data.tickets.forEach((items) => {
                this.liveTickets.push(items);
            });
            const uniqueData =
                [
                    ...this.liveTickets
                        .reduce((map, obj) => map.set(obj.id, obj), new Map())
                        .values(),
                ] || [];
            this.liveTickets = [...uniqueData];
            this.sortByDate();
        }
        this.webSocketService.isConnected.next(true);
    };

    sortByDate() {
        this.liveTickets = this.liveTickets.sort((a, b) => {
            return <any>new Date(b.out_time) - <any>new Date(a.out_time);
        });
        console.log(this.liveTickets);
    }

    getLiveTicketList() {
        return [...this.liveTickets];
    }

    getLiveTicket() {
        this.webSocketService
            .getWebSocket()
            .pipe(
                tap((data) =>
                    this.bindDataToView(
                        typeof data == 'string' ? JSON.parse(data) : data
                    )
                ),
                retryWhen((errors) => {
                    this.webSocketService.isConnected.next(false);
                    this.apiService.log(
                        `WebSocket connection to [ ${this.webSocketService.getWebSocketURL()} ] failed`
                    );
                    return errors.pipe(delay(3000));
                })
            )
            .subscribe((data) => {});
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            plate_number_prefix: [null],
            plate_number: [null],
            country: [null],
        });
        this.getLiveTicket();
    }

    async searchTickets() {
        try {
            this.isSearch = true;
            let form = this.form.value;
            this.isLoading = true;
            const vehicles = await this.homeService
                .searchTickets(
                    {
                        offset: this.page.offset,
                        limit: this.page.pageSize,
                    },
                    form
                )
                .toPromise();
            if (vehicles) {
                this.isLoading = false;
                this.searchTicketCount = vehicles.count;
                this.page.length = vehicles.count;
                this.vehicleList = vehicles.results;
                this.page.offset = this.vehicleList.length;
            }
        } catch (e) {
            this.isSearch = false;
            this.isLoading = false;
        } finally {
        }
    }

    async searchCar() {
        this.page = new Pagination().page;
        this.selectedVehicle = null;
        if (this.searchResultsComponent) {
            this.searchResultsComponent.isCreateLOT = false;
        }
        await this.searchTickets();
        if (this.isManager) {
            this.ticketsComponent.selectedTicket = null;
        }
    }

    selectVehicle(vehicleObject) {
        this.selectedVehicle = vehicleObject;
    }
    selectTicket(ticketObejct) {
        this.vehicleList = [];
        this.selectedVehicle = ticketObejct;
        this.form.reset();
    }

    async afterCollection(collectedvehicle: any) {
        if (collectedvehicle) {
            this.liveTickets = this.liveTickets.filter(
                (data) => data.id != collectedvehicle.id
            );
        }
        this.resetAll();
    }

    async resetAll() {
        this.isSearch = false;
        if (this.isManager) {
            this.ticketsComponent.form.reset();
            this.ticketsComponent.selectedTicket = null;
        }
        this.searchTicketCount = 0;
        this.page = new Pagination().page;
        this.selectedVehicle = null;
        this.vehicleList = [];
        this.form.reset();
        this.paymentComponent.selectedMethod = null;
        this.paymentComponent.selectedPaymentMethodStyle();
    }

    toggleHistory(value) {
        this.historyPopup.toggle();
    }

    ngOnDestroy() {}
}
