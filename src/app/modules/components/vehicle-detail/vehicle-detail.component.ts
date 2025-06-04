import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslationService } from 'app/services/translation.service';
import { PaymentStatus } from 'app/shared/constants/payment_status';

@Component({
    selector: 'app-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss'],
})
export class VehicleDetailComponent implements OnInit {
    selectedVehicleObject: any = null;
    paymentStatus = PaymentStatus;
    constructor(public translationService: TranslationService) {}

    @Input() set selectedVehicle(value: any) {
        this.selectedVehicleObject = value || null;
    }

    get selectedVehicle(): any {
        return this.selectedVehicleObject;
    }

    get direction(){
        return this.translationService.getDirection()
    }

    ngOnInit(): void {}

    getBalanceCollected() {
        if (this.selectedVehicle) {
            let total = +this.selectedVehicle.invoice_amount
                ? this.selectedVehicle.invoice_amount
                : 0;
            let cash = +this.selectedVehicle.amount;
            return Math.abs(cash - total).toFixed(3);
        }
        return 0;
    }

    getCurrentDate() {
        return new Date();
    }

    transformMinute(): string {
        let durationInMinutes = this.selectedVehicle.duration || 0;
        let hours = Math.floor(durationInMinutes / 60);
        let minutes = Math.floor(durationInMinutes % 60);
        return hours + ' hrs ' + minutes + ' mins';
    }
}
