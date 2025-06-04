import { HostListener, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { LocalStorageKeys } from 'app/shared/constants';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {
    currentGateConfig$: BehaviorSubject<any> = new BehaviorSubject(null);
    constructor(
        private _snackBar: MatSnackBar,
        private breakpointObserver: BreakpointObserver
    ) {}

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        let scrHeight = window.innerHeight;
        let scrWidth = window.innerWidth;
        return scrHeight - 56;
    }

    setStorageItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getStorageItem(key: string): string {
        return localStorage.getItem(key);
    }

    removeStorageItem(key: string) {
        localStorage.removeItem(key);
    }

    clearAllLocalStorage() {
        localStorage.removeItem(LocalStorageKeys.AccessToken);
        localStorage.removeItem(LocalStorageKeys.GateObject);
        localStorage.removeItem(LocalStorageKeys.User);
    }

    showErrorToast(msg) {
        this._snackBar.open(`${msg}`, 'Error', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error'],
        });
    }
    showSuccessToast(msg) {
        this._snackBar.open(`${msg}`, 'Success', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success'],
        });
    }

    showNewTicketNotification(msg) {
        this._snackBar.open(`${msg}`, 'Ticket', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['notification'],
        });
    }

    showWarningToast(msg) {
        this._snackBar.open(`${msg}`, 'Warning', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['warning'],
        });
    }

    isMobile() {
        let isMobileObser = this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
        ]);
        let isMobile = false;
        isMobileObser.subscribe((data) => {
            isMobile = data.matches;
        });
        return isMobile;
    }

    isMobileAlertModal(isCollectPopup = false) {
        let size = {
            width: '25vw',
            height: !isCollectPopup ? '20vh' : '30vh',
        };
        let isMobileObser = this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
        ]);
        let isMobileObserMedium = this.breakpointObserver.observe([
            Breakpoints.Medium,
        ]);
        isMobileObserMedium.subscribe((item) => {
            if (item.matches) {
                size.height = isCollectPopup ? '30%' : '20%';
                size.width = '50%';
            }
        });
        isMobileObser.subscribe((data) => {
            if (data.matches) {
                size.height = '30%';
                size.width = '96%';
            }
        });
        return size;
    }

    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    getParsedGateObject() {
        return localStorage.getItem(LocalStorageKeys.GateObject)
            ? JSON.parse(localStorage.getItem(LocalStorageKeys.GateObject))
            : null;
    }
}
