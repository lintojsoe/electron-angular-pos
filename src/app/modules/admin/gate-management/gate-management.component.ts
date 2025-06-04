import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from 'app/services/homeService';
import { TranslationService } from 'app/services/translation.service';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Pagination } from 'app/shared/constants';

@Component({
    selector: 'app-gate-management',
    templateUrl: './gate-management.component.html',
    styleUrls: ['./gate-management.component.scss'],
})
export class GateManagementComponent implements OnInit {
    @ViewChild('configDrawer') configDrawer;
    gates = [];
    page = new Pagination().page;

    columns: string[] = [
        'gate_no',
        'gate_type',
        'status',
        'updated_at',
        'action',
    ];
    form: FormGroup;
    groups = [];
    isLoading = false;
    gateDetails: any;
    isLoadingConfig: boolean;
    constructor(
        public translationService: TranslationService,
        private homeService: HomeService,
        private fb: FormBuilder,
        private utilitiesService: UtilitiesService,
        private dialog: MatDialog,
        private translate: TranslateService
    ) {}

    async ngOnInit(): Promise<void> {
        this.formInit();
        await this.getAllGates();
    }

    formInit() {
        this.form = this.fb.group({
            pos_configuration: this.fb.group({
                api_print_receipt: [null],
                api_open_drawer: [null],
            }),
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    async getAllGates() {
        try {
            this.isLoading = true;
            this.gates = [];
            const users = await this.homeService
                .getGates({
                    limit: this.page.pageSize,
                    offset: this.page.offset,
                    gate_type: 'exit',
                })
                .toPromise();
            if (users) {
                this.page.length = users.count;
                this.gates = users.results;
                this.isLoading = false;
            }
        } catch {
            this.isLoading = false;
        } finally {
        }
    }

    async handlePageEvent(event) {
        this.page.length = event.length;
        this.page.pageSize = event.pageSize;
        this.page.pageIndex = event.pageIndex;
        this.page.offset = this.page.pageIndex * this.page.pageSize;
        this.getAllGates();
    }

    addCustomer() {
        this.formInit();
        this.toggle();
    }

    getGroupsName(group = []) {
        return group
            .filter((data) => data.id)
            .map((item) => {
                return item.name;
            })
            .toString();
    }

    toggle() {
        this.configDrawer.toggle();
    }
    configGate(element) {
        this.form.reset();
        this.gateDetails = element;
        this.getConfiguration();
        this.toggle();
    }
    async getConfiguration() {
        try {
            this.isLoadingConfig = true;
            const config = await this.homeService
                .getConfig(this.gateDetails.id)
                .toPromise();
            if (config) {
                let pos_configuration = config.pos_configuration;
                this.isLoadingConfig = false;
                this.form.patchValue({
                    pos_configuration: {
                        api_open_drawer: pos_configuration.api_open_drawer
                            ? pos_configuration.api_open_drawer
                            : null,
                        api_print_receipt: pos_configuration.api_print_receipt
                            ? pos_configuration.api_print_receipt
                            : null,
                    },
                });
            }
        } catch {
            this.isLoadingConfig = false;
        } finally {
        }
    }
    async save() {
        try {
            let config = this.form.value;
            const saveSettings = await this.homeService
                .patchConfig(this.gateDetails.id, config)
                .toPromise();
            if (saveSettings) {
                let msg = this.translate.instant(
                    'Configuration saved successfully'
                );
                this.utilitiesService.showSuccessToast(msg);
                this.utilitiesService.currentGateConfig$.next(saveSettings);
                this.toggle();
            }
        } catch {
        } finally {
        }
    }
}
