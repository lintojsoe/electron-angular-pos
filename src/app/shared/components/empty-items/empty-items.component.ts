import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-empty-items',
    templateUrl: './empty-items.component.html',
    styleUrls: ['./empty-items.component.scss'],
})
export class EmptyItemsComponent implements OnInit {
    @Input() message: any = '';
    @Input() hideIcon: boolean = false;
    constructor(private translateService: TranslateService) {
        if (this.message) {
            this.message = this.translateService.instant(this.message);
        }
    }

    ngOnInit(): void {}
}
