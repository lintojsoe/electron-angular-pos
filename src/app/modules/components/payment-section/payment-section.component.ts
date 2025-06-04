import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'app/services/homeService';
import { TranslationService } from 'app/services/translation.service';
import { UtilitiesService } from 'app/services/utilitiesService';
import { CollectSuccessPopupComponent } from 'app/shared/components/collect-success-popup/collect-success-popup.component';
import { PaymentTypes } from 'app/shared/constants';
import { PaymentStatus } from 'app/shared/constants/payment_status';
import { css } from 'chroma-js';
import Keyboard from 'simple-keyboard';

@Component({
    selector: 'app-payment-section',
    templateUrl: './payment-section.component.html',
    styleUrls: ['./payment-section.component.scss'],
})
export class PaymentSectionComponent implements OnInit {
    selectedTicketObject: any = null;

    @Input() set selectedTicket(value: any) {
        this.selectedTicketObject = value || null;
        this.resetAll();
    }
    @Output()
    afterCollection: EventEmitter<any> = new EventEmitter<any>();

    paymentMethodType = PaymentTypes;
    keyboard: Keyboard;
    selectedMethod: any;

    currencies = [
        { value: 0.05, qty: 0, name: '50 Fils', name_ur: "50 Fils", name_ar: "50 Fils" },
        { value: 0.1, qty: 0, name: '100 Fils', name_ur: "100 Fils", name_ar: "100 Fils" },
        { value: 0.25, qty: 0, name: '250 Fils', name_ur: "250 Fils", name_ar: "250 Fils" },
        { value: 0.5, qty: 0, name: '500 Fils', name_ur: "500 Fils", name_ar: "500 Fils" },
        { value: 1, qty: 0, name: '1 KWD', name_ur: "1 KWD", name_ar: "1 KWD" },
        { value: 5, qty: 0, name: '5 KWD', name_ur: "5 KWD", name_ar: "5 KWD" },
        { value: 10, qty: 0, name: '10 KWD', name_ur: "10 KWD", name_ar: "10 KWD" },
        { value: 20, qty: 0, name: '20 KWD', name_ur: "20 KWD", name_ar: "20 KWD" },
        { value: -1, qty: 0, name: 'Reset', name_ur: "دوبارہ ترتیب دیں۔", name_ar: "إعادة ضبط" },
    ];

    form: FormGroup;

    get selectedTicket(): any {
        return this.selectedTicketObject;
    }

    get cashAmount() {
        return +this.form.get('cash').value;
    }

    paymentMethods = [];

    reasonModel: any;

    reasons = [];

    isLoading: boolean = false;

    paymentStatus = PaymentStatus;

    get disableContainer() {
        let isDisable = true;
        if (this.selectedTicket) {
            if (
                this.selectedTicket.payment_status == this.paymentStatus.Success
            ) {
                isDisable = true;
            } else {
                isDisable = false;
            }
        } else {
            isDisable = true;
        }
        return isDisable;
    }

    constructor(
        public translationService: TranslationService,
        private fb: FormBuilder,
        private homeService: HomeService,
        private utilitiesService: UtilitiesService,
        private dialog: MatDialog
    ) {
        this.getPaymentModes();
        this.getReasons();
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            cash: 0,
        });
    }

    async getReasons() {
        try {
            const reasons = await this.homeService
                .getReasons({ limit: 99999, offset: 0 })
                .toPromise();
            if (reasons) {
                this.reasons = reasons.results;
            }
        } catch {
        } finally {
        }
    }

    async getPaymentModes() {
        try {
            this.isLoading = true;
            const paymentModes = await this.homeService
                .getPaymentModes({ limit: 99999, offset: 0 })
                .toPromise();
            if (paymentModes) {
                this.paymentMethods = paymentModes.results;
                this.selectedMethod = this.paymentMethods[0];
                this.isLoading = false;
                setTimeout(() => {
                    this.selectedPaymentMethodStyle();
                }, 300);
            }
        } catch {
            this.isLoading = false;
        } finally {
        }
    }
    ngAfterViewInit() {
        this.keyboard = new Keyboard({
            layout: {
                default: ['1 2 3', '4 5 6', '7 8 9', '. 0 {bksp}'],
            },
            onChange: (input) => this.onChange(input),
            onKeyPress: (button) => this.onKeyPress(button),
        });

        this.formInit();
        var d1 = document.querySelectorAll('.hg-button-bksp');
        d1.forEach((node) => {
            node.lastChild.remove();
            node.insertAdjacentHTML(
                'beforeend',
                '<img class="w-6" src="assets/images/backspace.png">'
            );
        });
    }

    onChange = (input: string) => {
        this.form.get('cash').setValue(input);
        console.log('Input changed', input);
    };

    onKeyPress = (button: string) => {
        console.log('Button pressed', button);
    };

    onInputChange = (event: any) => {
        console.log(event.target.value, 'onInputChange');
        this.keyboard.setInput(event.target.value);
    };

    checkCash() {
        console.log("input")
        if (!this.form.get('cash').value) {
            this.keyboard.setInput('');
        }
    }

    handleShift = () => {
        let currentLayout = this.keyboard.options.layoutName;
        let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

        this.keyboard.setOptions({
            layoutName: shiftToggle,
        });
    };

    formInit() {
        let initValue = 0;
        this.form = this.fb.group({
            cash: [
                initValue.toFixed(3),
                [Validators.compose([Validators.required])],
            ],
        });

        this.reasonModel = null;
    }

    plus(index: number) {
        if (this.currencies[index].value == -1) {
            this.resetAll(true);
        } else {
            this.currencies[index].qty = this.currencies[index].qty + 1;
            this.calculateCash(index);
        }
    }

    calculateCash(index: number) {
        let value = this.currencies[index].value;
        let absValue = Math.abs(value + this.cashAmount).toFixed(3);
        this.form.controls.cash.setValue(absValue);
    }

    getBalanceCollected() {
        if (this.selectedTicket) {
            let total = +this.selectedTicket.invoice_amount
                ? this.selectedTicket.invoice_amount
                : 0;
            let cash = +this.selectedTicket.amount;
            return Math.abs(cash - total).toFixed(3);
        }
        return 0;
    }

    resetAll(force = false) {
        if (force) {
            this.keyboard.setInput('');
        }
        this.currencies.map((data) => (data.qty = 0));
        this.formInit();
        this.getBalance();

        if (this.paymentMethods.length) {
            this.selectedMethod = this.paymentMethods[0];
            this.selectedPaymentMethodStyle();
        }
    }

    getBalance() {
        if (this.selectedTicket) {
            let total = +this.selectedTicket.invoice_amount
                ? this.selectedTicket.invoice_amount
                : 0;
            let cash = this.cashAmount ? this.cashAmount : 0;
            if (cash > total) {
                return Math.abs(cash - total).toFixed(3);
            } else {
                return 0;
            }
        }
        return 0;
    }

    disableBtn() {
        if (!this.disableContainer) {
            if (this.cashAmount >= +this.selectedTicket.invoice_amount) {
                return false;
            }
            return true;
        }
        return true;
    }

    changePayment(pObject) {
        this.reasonModel = null;
        this.selectedMethod = pObject;
        this.selectedPaymentMethodStyle();
    }

    selectedPaymentMethodStyle() {
        this.paymentMethods.forEach((data) => {
            document.getElementById(data.id).style.backgroundColor = 'white';
            document.getElementById(data.id).style.color = 'black';
        });
        if (this.selectedMethod && this.selectedMethod.id) {
            document.getElementById(
                this.selectedMethod.id
            ).style.backgroundColor = '#14c5fc';
            document.getElementById(this.selectedMethod.id).style.color =
                'white';
        }
    }

    collect(type: any = this.paymentMethodType.Cash) {
        let ticketCollectionObject = {
            reason: this.reasonModel || null,
            cash: this.cashAmount || 0,
            selectedTicket: this.selectedTicket,
            paymentMethod: type,
            pay_mod_id: this.selectedMethod.id,
        };
        let size = this.utilitiesService.isMobileAlertModal();
        const dialogRef = this.dialog.open(CollectSuccessPopupComponent, {
            data: { ticketCollectionObject },
            maxWidth: '',
            width: `${size.width}`,
            height: `${size.height}`,
            disableClose: true,
            panelClass: ['no-padding'],
        });
        dialogRef.afterClosed().subscribe(async (resp) => {
            if (resp) {
                this.afterCollection.emit(resp);
            }
        });
    }
}
