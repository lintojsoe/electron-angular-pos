import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'app/core/user/user.service';
import { AppRoutes } from 'app/shared/constants';
// import { AppRoutes } from 'app/shared';

@Injectable({
    providedIn: 'root',
})
export class MainNavigationResolver implements Resolve<any> {
    constructor(
        private translate: TranslateService,
        private userService: UserService
    ) {}

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any> {
        const navigation: FuseNavigationItem[] = [
            {
                id: 'ticket',
                title: this.translate.instant('Tickets'),
                type: 'basic',
                icon: 'heroicons_outline:ticket',
                link: AppRoutes.Home,
            },
            {
                id: 'users',
                title: this.translate.instant('Users'),
                type: 'basic',
                icon: 'people',
                link: AppRoutes.Users,
                hidden: () => true,
            },
            {
                id: 'reports',
                title: this.translate.instant('Reports'),
                type: 'collapsable',
                icon: 'heroicons_outline:annotation',
                children: [
                    {
                        id: 'collection_reports',
                        title: this.translate.instant('Collection Reports'),
                        type: 'basic',
                        icon: 'heroicons_outline:document-report',
                        link: `${AppRoutes.Reports}/${AppRoutes.CollectionReport}`,
                    },
                    {
                        id: 'closing_report',
                        title: this.translate.instant('Closing Reports'),
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-list',
                        link: `${AppRoutes.Reports}/${AppRoutes.ClosingReport}`,
                    },
                ],
            },
            {
                id: 'gate_management',
                title: this.translate.instant('Gate Management'),
                type: 'basic',
                icon: 'mat_outline:sensor_door',
                link: AppRoutes.GateManagement,
                hidden: () => true,
            },
            {
                id: 'verify_plate',
                title: this.translate.instant('Plate Number Verification'),
                type: 'basic',
                icon: 'mat_outline:verified',
                link: AppRoutes.VerifyPlate,
                hidden: () => true,
            },
        ];

        if (this.userService.checkManager()) {
            navigation.forEach((data) => {
                if (
                    data.id == 'users' ||
                    data.id == 'gate_management' ||
                    data.id == 'verify_plate'
                ) {
                    data.hidden = () => false;
                }
            });
            // navigation
            //     .filter((data) => {
            //         data.id == 'users';
            //     })
            //     .map((item) => (item.hidden = () => false));
        }
        return {
            navigation: {
                compact: navigation,
                default: navigation,
                futuristic: navigation,
                horizontal: navigation,
            },
        };
    }
}
