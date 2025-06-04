import { Component, Inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'app/services/homeService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { LocalStorageKeys } from 'app/shared/constants';

@Component({
    selector: 'app-settings-popover',
    templateUrl: './settings-popover.component.html',
    styleUrls: ['./settings-popover.component.scss'],
})
export class SettingsPopoverComponent implements OnInit {
    form: FormGroup;
    gates = [];
    userObject: any = null;

    set setGate_no(value: any) {
        this.form.get('gate_no').setValue(value);
    }

    get gateNo() {
        return this.form.get('gate_no');
    }

    get gateID() {
        return this.gates
            .filter((data) => data.gate_no == this.gateNo.value)
            .map((resp) => resp.id);
    }

    get gateObject() {
        return this.gates.filter(
            (data) => data.gate_no == this.gateNo.value
        )[0];
    }

    constructor(
        private fb: FormBuilder,
        private homeService: HomeService,
        public dialogRef: MatDialogRef<SettingsPopoverComponent>,
        private utilitiesService: UtilitiesService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.userObject = data.userObject ? data.userObject : null;
        this.form = this.fb.group({
            gate_no: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getGates();
    }

    async getGates() {
        try {
            const gates = await this.homeService
                .getGates(
                    {
                        limit: 99999,
                        offset: 0,
                        gate_type: 'exit',
                        status: 'enabled',
                    },
                    this.userObject.access || null
                )
                .toPromise();
            if (gates) {
                this.gates = gates.results;
                this.gates.length
                    ? (this.setGate_no = this.gates[0].gate_no)
                    : null;
            }
        } catch {
        } finally {
        }
    }

    async save() {
        if (this.form.valid) {
            this.utilitiesService.setStorageItem(
                LocalStorageKeys.GateObject,
                JSON.stringify(this.gateObject)
            );
            this.dialogRef.close(true);
        }
    }
}
