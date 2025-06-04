import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from 'app/services/homeService';
import { PrintService } from 'app/services/printerService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { PaymentTypes } from 'app/shared/constants';
import moment from 'moment';

export interface CollectionObejct {
    reason: string;
    cash: number | string;
    selectedTicket: any;
    paymentMethod: number;
    pay_mod_id: number;
}

@Component({
    selector: 'app-collect-success-popup',
    templateUrl: './collect-success-popup.component.html',
    styleUrls: ['./collect-success-popup.component.scss'],
})
export class CollectSuccessPopupComponent implements OnInit {
    loading = false;
    collection: CollectionObejct;
    paymentMethodType = PaymentTypes;
    constructor(
        private homeService: HomeService,
        private utilitiesService: UtilitiesService,
        private translate: TranslateService,
        public dialogRef: MatDialogRef<CollectSuccessPopupComponent>,
        private printService: PrintService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.collection = data.ticketCollectionObject || null;
    }

    ngOnInit(): void {}

    dismiss() {
        this.dialogRef.close(false);
    }

    async close() {
        try {
            this.loading = true;
            let selectedTicket = this.collection.selectedTicket;
            let invoice_amount = selectedTicket.invoice_amount;

            let gateNo = this.utilitiesService.getParsedGateObject()
                ? this.utilitiesService.getParsedGateObject().gate_no
                : null;
            let config = this.utilitiesService.currentGateConfig$.value
                .pos_configuration
                ? this.utilitiesService.currentGateConfig$.value
                      .pos_configuration
                : null;

            if (config && config.api_open_drawer && config.api_print_receipt) {
                let reference: any = '';

                if (typeof selectedTicket.reference == 'object') {
                    reference = selectedTicket.reference.exit || null;
                } else if (typeof selectedTicket.reference == 'string') {
                    reference = selectedTicket.reference || '';
                }

                switch (this.collection.paymentMethod) {
                    case this.paymentMethodType.Cash: {
                        invoice_amount = this.collection.cash;
                        break;
                    }
                    case this.paymentMethodType.FreePass: {
                        invoice_amount = 0;
                        break;
                    }
                }

                let form = {
                    id: selectedTicket.id,
                    exit_gate_no: gateNo,
                    out_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    invoice_amount: invoice_amount,
                    reference: reference,
                    payment_mode: this.collection.pay_mod_id,
                    exit_reason: this.collection.reason,
                };

                if (!form.reference) {
                    delete form.reference;
                }
                try {
                    const collect = await this.homeService
                        .postCollectCash(form)
                        .toPromise();
                    if (collect) {
                        this.loading = false;
                        this.openDrawer(config.api_open_drawer);
                        this.printReceipt(
                            config.api_print_receipt,
                            this.collection.selectedTicket
                        );
                        let msg = this.translate.instant(
                            'Amount collected successfully'
                        );
                        this.utilitiesService.showSuccessToast(msg);
                        this.dialogRef.close(form);
                    }
                } catch {
                    this.loading = false;
                } finally {
                }
            } else {
                this.utilitiesService.showErrorToast(
                    'Please contact admin to configure print receipt and open drawer APIs'
                );
            }
        } catch {
        } finally {
        }
    }

    async printReceipt(url, form) {
        const print = await this.printService
            .printReceipt(url, form)
            .toPromise();
        if (print) {
            console.log(print);
        }
    }
    async openDrawer(url) {
        const openDrawer = await this.printService.openDrawer(url).toPromise();
        if (openDrawer) {
            console.log(openDrawer);
        }
    }
}
