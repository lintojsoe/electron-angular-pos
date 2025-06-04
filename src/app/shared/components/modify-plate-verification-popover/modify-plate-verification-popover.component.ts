import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from 'app/services/homeService';
import { UtilitiesService } from 'app/services/utilitiesService';
import moment from 'moment';

@Component({
    selector: 'app-modify-plate-verification-popover',
    templateUrl: './modify-plate-verification-popover.component.html',
    styleUrls: ['./modify-plate-verification-popover.component.scss'],
})
export class ModifyPlateVerificationPopoverComponent implements OnInit {
    ticketObject: any;
    form: FormGroup;
    constructor(
        private utilitiesService: UtilitiesService,
        private translateService: TranslateService,
        private homeService: HomeService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModifyPlateVerificationPopoverComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.ticketObject = data.ticketObject || null;
    }

    formInit() {
        this.form = this.fb.group({
            country: [null, Validators.compose([Validators.required])],
            plate_number_prefix: [
                null,
                Validators.compose([Validators.required]),
            ],
            plate_number: [null, Validators.compose([Validators.required])],
            in_time: [null],
            out_time: [null],
        });

        if (
            this.ticketObject &&
            this.ticketObject.second_entry_log &&
            this.ticketObject.second_entry_log.data
        ) {
            let country =
                this.ticketObject.second_entry_log.data.country || null;
            let plate_number_prefix =
                this.ticketObject.second_entry_log.data.plate_number_prefix ||
                null;
            let plate_number =
                this.ticketObject.second_entry_log.data.plate_number || null;
            let in_time =
                this.ticketObject.second_entry_log.data.in_time || null;
            let out_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            this.form.get('country').setValue(country);
            this.form.get('plate_number_prefix').setValue(plate_number_prefix);
            this.form.get('plate_number').setValue(plate_number);
            this.form.get('in_time').setValue(in_time);
            this.form.get('out_time').setValue(out_time);
        }
    }

    ngOnInit(): void {
        this.formInit();
    }

    close(value) {
        this.dialogRef.close(value);
    }

    async updatePlateNumber() {
        if (this.form.valid) {
            let form = this.form.value;
            console.log(form);
            this.form.disable();
            try {
                const updatePlateNumber = await this.homeService
                    .updatePlateNumber(form, this.ticketObject.id)
                    .toPromise();
                if (updatePlateNumber) {
                    this.form.enable();
                    let msg = this.translateService.instant(
                        'Plate Number updated successfully'
                    );
                    this.utilitiesService.showSuccessToast(msg);
                    this.close(this.ticketObject.id);
                }
            } catch {
                this.form.enable();
            } finally {
            }
        }
    }
}
