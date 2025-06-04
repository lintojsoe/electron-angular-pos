import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { HomeService } from 'app/services/homeService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class MainComponent {
    /**
     * Constructor
     */
    constructor(
        private userService: UserService,
        private utilitiesService: UtilitiesService,
        private homeService: HomeService,
    ) {}

    async ngOnInit(): Promise<void> {
        this.getCurrentgateConfig();
    }

    async getCurrentgateConfig() {
        let gateObj = this.utilitiesService.getParsedGateObject();
        if (gateObj) {
            const config = await this.homeService
                .getConfig(gateObj.id)
                .toPromise();
            if (config) {
                this.utilitiesService.currentGateConfig$.next(config);
            }
        }
    }
}
