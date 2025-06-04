import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService } from '@fuse/components/navigation';
import { InitialData } from 'app/app.types';
import { TranslationService } from 'app/services/translation.service';
import { HomeService } from 'app/services/homeService';
import { UserService } from 'app/core/user/user.service';
import { Languages } from 'app/shared/constants';
import { UtilitiesService } from 'app/services/utilitiesService';
import { WebSocketService } from 'app/services/websocketService';

@Component({
    selector: 'classic-layout',
    templateUrl: './classic.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassicLayoutComponent
    implements OnInit, OnDestroy, AfterViewInit
{
    languages = new Languages().languages;
    data: InitialData;
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    gateID: any = null;
    gates = [];
    user: any;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        public translationService: TranslationService,
        private homeService: HomeService,
        private _userService: UserService,
        private utilitiesService: UtilitiesService,
        public wbService: WebSocketService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    get getPosition(): string {
        return this.translationService.getDirection() == 'ltr'
            ? 'left'
            : 'right';
    }

    get iconMargin() {
        return this.translationService.getDirection() == 'ltr'
            ? 'mr-2'
            : 'ml-2 mr-0';
    }

    get gateObject() {
        return this.utilitiesService.getParsedGateObject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.user = this._userService.userDetails()
            ? this._userService.userDetails()
            : null;
        console.log(this.user);
        // Subscribe to the resolved route mock-api
        this._activatedRoute.data.subscribe((data: Data) => {
            this.data = data.initialData;
        });
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('lg');
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewInit(): void {
        if (!this.isScreenSmall) {
            this.toggleNavigation('mainNavigation');
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
