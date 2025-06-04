import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from 'app/services/homeService';
import { TranslationService } from 'app/services/translation.service';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Pagination } from 'app/shared/constants';
import moment from 'moment';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
    @Input() searchValues: any;
    @Input() vehicleList = [];
    @Input() isSearch: boolean = false;
    @Input() page = new Pagination().page;
    @Input() searchTicketCount = 0;
    @Output()
    selectVehicleHandler: EventEmitter<any> = new EventEmitter<any>();
    @Output() paginationHandler: EventEmitter<any> = new EventEmitter<any>();
    isCreateLOT: boolean = false;
    constructor(
        public translationService: TranslationService,
        private fb: FormBuilder,
        private homeService: HomeService,
        private translate: TranslateService,
        private utilitiesService: UtilitiesService
    ) { }
    isLoading: boolean = false;
    form: FormGroup;

    get out_time() {
        return new Date();
    }

    get in_time() {
        let d = new Date();
        d.setHours(d.getHours() - 1);
        return d;
    }

    ngOnInit(): void {
        this.formInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes.searchValues);
        if (
            this.form &&
            changes &&
            changes.searchValues &&
            changes.searchValues.currentValue
        ) {
            this.form
                .get('country')
                .setValue(changes.searchValues.currentValue.country);
            this.form
                .get('plate_number_prefix')
                .setValue(
                    changes.searchValues.currentValue.plate_number_prefix
                );
            this.form
                .get('plate_number')
                .setValue(changes.searchValues.currentValue.plate_number);
        }
    }

    formInit() {
        this.form = this.fb.group({
            country: [
                this.searchValues.country,
                Validators.compose([Validators.required]),
            ],
            plate_number_prefix: [
                this.searchValues.plate_number_prefix,
                Validators.compose([Validators.required]),
            ],
            plate_number: [
                this.searchValues.plate_number,
                Validators.compose([Validators.required]),
            ],
            in_time: [this.in_time, Validators.compose([Validators.required])],
            out_time: [
                this.out_time,
                Validators.compose([Validators.required]),
            ],
        });
    }

    async saveLOT() {
        if (this.form.valid) {
            let form = this.form.value;
            form.in_time = moment(form.in_time).format('YYYY-MM-DD HH:mm:ss');
            form.out_time = moment(form.out_time).format('YYYY-MM-DD HH:mm:ss');
            console.log(form);
            this.form.disable()
            try {
                const createLOT = await this.homeService
                    .createLOT(form)
                    .toPromise();
                if (createLOT) {
                    this.form.enable()
                    let msg = this.translate.instant(
                        'Ticket created successfully'
                    );
                    this.utilitiesService.showSuccessToast(msg);
                    this.cancelLOT();
                    this.selectVehilce(createLOT);
                }
            } catch {
                this.form.enable()
            } finally {
            }
        }
    }

    cancelLOT() {
        this.isCreateLOT = false;
    }

    selectVehilce(vehicleObject) {
        this.selectVehicleHandler.emit(vehicleObject);
    }

    loadMore() {
        this.isLoading = true;
        this.paginationHandler.emit();
    }

    checkPagination() {
        return this.page.offset >= this.page.length ? false : true;
    }

    createLostTicket() {
        this.isCreateLOT = true;
    }
}
