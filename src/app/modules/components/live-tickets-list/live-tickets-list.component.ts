import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationService } from 'app/services/translation.service';

@Component({
    selector: 'app-live-tickets-list',
    templateUrl: './live-tickets-list.component.html',
    styleUrls: ['./live-tickets-list.component.scss'],
})
export class LiveTicketsListComponent implements OnInit {
    @Input() vehicleList = [];
    @Input() isSearch: boolean = false;
    @Output()
    selectVehicleHandler: EventEmitter<any> = new EventEmitter<any>();
    constructor(public translationService: TranslationService) {}

    ngOnInit(): void {}

    selectVehilce(vehicleObject) {
        this.selectVehicleHandler.emit(vehicleObject);
    }
}
