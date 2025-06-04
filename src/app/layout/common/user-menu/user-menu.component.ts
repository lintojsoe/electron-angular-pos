import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { AuthService } from 'app/core/auth/auth.service';
import { TranslationService } from 'app/services/translation.service';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { UtilitiesService } from 'app/services/utilitiesService';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';
import { WebSocketService } from 'app/services/websocketService';

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'userMenu',
})
export class UserMenuComponent implements OnInit, OnDestroy {
    static ngAcceptInputType_showAvatar: BooleanInput;

    @Input() showAvatar: boolean = true;
    user: User;
    form: FormGroup;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    isConnected: boolean;

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _userService: UserService,
        private _authService: AuthService,
        public translationService: TranslationService,
        private wb: WebSocketService
    ) {}

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
        // Subscribe to user changes
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }
    }

    /**
     * Sign out
     */
    signOut(): void {
        this.wb.isConnected.next(false);
        this.wb.isConnected.complete();
        this.wb.getWebSocket().complete();
        this.wb.getPlateVerificationWebSocket().complete()
        this._authService.signOut();
        this._router.navigate(['/sign-in']);
    }
}
