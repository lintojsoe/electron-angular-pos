import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { CollectSuccessPopupComponent } from './components/collect-success-popup/collect-success-popup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmptyItemsComponent } from './components/empty-items/empty-items.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatDialogModule } from '@angular/material/dialog';
import { ModifyPlateVerificationPopoverComponent } from './components/modify-plate-verification-popover/modify-plate-verification-popover.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTooltipModule,
        CommonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        FuseAlertModule,
        FuseCardModule,
        MatSnackBarModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
        NgxSkeletonLoaderModule,
        FuseDrawerModule,
        MatDialogModule,
        MatDividerModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTooltipModule,
        CommonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        FuseAlertModule,
        FuseCardModule,
        CollectSuccessPopupComponent,
        AlertModalComponent,
        MatSnackBarModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        EmptyItemsComponent,
        InfiniteScrollModule,
        NgxSkeletonLoaderModule,
        FuseDrawerModule,
        MatDialogModule,
        ModifyPlateVerificationPopoverComponent,
        MatDividerModule
    ],
    declarations: [
        AlertModalComponent,
        CollectSuccessPopupComponent,
        EmptyItemsComponent,
        ModifyPlateVerificationPopoverComponent,

    ],
})
export class SharedModule {}
