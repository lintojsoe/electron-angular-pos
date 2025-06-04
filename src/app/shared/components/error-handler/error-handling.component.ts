import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'app/shared/service/error-handling.service';
import { ApiService } from 'app/services/api.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {}

    handleError(error: Error | HttpErrorResponse) {
        const errorService = this.injector.get(ErrorService);
        const apiService = this.injector.get(ApiService);
        let message;
        let stackTrace = errorService.getClientStack(error);
        console.error(stackTrace);
        apiService.log(stackTrace);
        message = errorService.getClientMessage(error);
        console.error(message);
        apiService.log(message);
    }
}
