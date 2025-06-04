import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    checkOnline() {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
    }

    getClientMessage(error: Error): string {
        return error.message ? error.message : error.toString() || "Cant find the error";
    }

    getClientStack(error: Error): string {
        return error.stack || "Cant find the error";
    }

    getServerStack(error: HttpErrorResponse): string {
        return error.error.StackTrace || "Cant find the error";
    }
}
