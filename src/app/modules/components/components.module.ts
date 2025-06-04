import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import { TicketsComponent } from './tickets/tickets.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleResultSkeltonComponent } from './vehicle-result-skelton/vehicle-result-skelton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TicketsSkeltonComponent } from './tickets-skelton/tickets-skelton.component';
import { CreateUserPopupComponent } from './create-user-popup/create-user-popup.component';
import { PrintReportComponent } from './print-report/print-report.component';
import { LiveTicketsListComponent } from './live-tickets-list/live-tickets-list.component';
import { ClosingReportComponent } from './closing-report/closing-report.component';
import { SettingsPopoverComponent } from './settings-popover/settings-popover.component';
import { MatDividerModule } from '@angular/material/divider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatRadioModule } from '@angular/material/radio';
import { PaymentSectionComponent } from './payment-section/payment-section.component';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { PlateVerificationHistoryComponent } from './plate-verification-history/plate-verification-history.component';

@NgModule({
    declarations: [
        TicketsComponent,
        SearchResultsComponent,
        VehicleDetailComponent,
        VehicleResultSkeltonComponent,
        TicketsSkeltonComponent,
        CreateUserPopupComponent,
        PrintReportComponent,
        LiveTicketsListComponent,
        ClosingReportComponent,
        SettingsPopoverComponent,
        PaymentSectionComponent,
        PlateVerificationHistoryComponent,
    ],
    imports: [
        SharedModule,
        NgxSkeletonLoaderModule,
        MatDividerModule,
        InfiniteScrollModule,
        MatRadioModule,
        FuseScrollbarModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatTimepickerModule,
    ],
    exports: [
        TicketsComponent,
        VehicleDetailComponent,
        SearchResultsComponent,
        VehicleResultSkeltonComponent,
        TicketsSkeltonComponent,
        CreateUserPopupComponent,
        PrintReportComponent,
        LiveTicketsListComponent,
        ClosingReportComponent,
        MatDividerModule,
        PaymentSectionComponent,
        PlateVerificationHistoryComponent
    ],
})
export class ComponentsModule {}
