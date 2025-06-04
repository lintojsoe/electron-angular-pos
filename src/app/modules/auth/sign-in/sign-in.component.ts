import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { SettingsPopoverComponent } from 'app/modules/components/settings-popover/settings-popover.component';
import { ApiService } from 'app/services/api.service';
import { UtilitiesService } from 'app/services/utilitiesService';
import { LocalStorageKeys } from 'app/shared/constants';
import { environment } from 'environments/environment';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';

function startWithHttp(
    control: AbstractControl
): { [key: string]: any } | null {
    if (control.value && !control.value.startsWith('http')) {
        return { startWithHttp: true };
    }
    return null;
}
function containSlashEnd(
    control: AbstractControl
): { [key: string]: any } | null {
    if (control.value && control.value.substr(-1) === '/') {
        return { containSlashEnd: true };
    }
    return null;
}

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: FuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    expandSettings = false;
    pingLoading: boolean;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private apiService: ApiService,
        private utilitiesService: UtilitiesService,
        private dialog: MatDialog
    ) {}

    toggleSettings() {
        this.expandSettings = !this.expandSettings;
    }

    ngOnInit(): void {
        let server_url = this.utilitiesService.getStorageItem(
            LocalStorageKeys.ServerURL
        );

        let ipAddress = this.utilitiesService.getStorageItem(
            LocalStorageKeys.IpAddress
        );

        let port = this.utilitiesService.getStorageItem(LocalStorageKeys.Port);

        let enable_https = this.utilitiesService.getStorageItem(
            LocalStorageKeys.Enable_HTTPS
        );

        this.signInForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            port: [port ? port : ''],
            enable_https: [false],
            ipAddress: [ipAddress ? ipAddress : '', [containSlashEnd]],
            server_url: [server_url ? server_url : ''],
        });
    }

    getFullServerURL(): string {
        let form = this.signInForm.value;
        let serverURL = `${form.enable_https ? 'https://' : 'http://'}${
            form.ipAddress
        }${form.port ? `:${form.port}` : ''}`;

        return serverURL;
    }

    setLocalStorage() {
        this.utilitiesService.setStorageItem(
            LocalStorageKeys.ServerURL,
            this.signInForm.value.server_url
        );

        this.utilitiesService.setStorageItem(
            LocalStorageKeys.Port,
            this.signInForm.value.port
        );

        this.utilitiesService.setStorageItem(
            LocalStorageKeys.Enable_HTTPS,
            this.signInForm.value.enable_https
        );

        this.utilitiesService.setStorageItem(
            LocalStorageKeys.IpAddress,
            this.signInForm.value.ipAddress
        );
    }

    async signIn(): Promise<void> {
        if (this.signInForm.invalid) {
            return;
        }

        if (this.signInForm.value.ipAddress) {
            let serverURL = this.getFullServerURL();
            this.signInForm.controls.server_url.setValue(serverURL);

            this.signInForm.disable();
            this.showAlert = false;
            try {
                const login = await this._authService
                    .signIn(this.signInForm.value)
                    .toPromise();
                if (login) {
                    this.signInForm.enable();
                    this.setLocalStorage();
                    this.showSettingsPopover(login);
                }
            } catch (e) {
                let errorMessage = `User try to sign in with this username and password [ Username : ${
                    this.signInForm.controls.username.value
                } & Password : ${
                    this.signInForm.controls.password.value
                } ], But failed because of ${
                    e.message ? e.message : 'Wrong username or password'
                }`;
                this.apiService.log(errorMessage, '/api/login/');
                this.signInForm.enable();
                this.alert = {
                    type: 'error',
                    message: 'Wrong username or password ',
                };
                this.showAlert = true;
            } finally {
            }
        } else {
            this.alert = {
                type: 'error',
                message: 'Please add server settings',
            };
            this.showAlert = true;
        }
    }

    testConnection() {
        try {
            this.setLoading(true);
            let serverURL = this.getFullServerURL();
            let heartbeatURL = `${serverURL}/api/heart-beat/`;
            this.apiService
                .get(heartbeatURL, undefined, undefined, true, true)
                .pipe(first())
                .subscribe(
                    (resp) => {
                        this.setLoading(false);
                        if (resp && resp.datetime) {
                            this.utilitiesService.showSuccessToast(
                                'Connection Success'
                            );
                        } else {
                            this.utilitiesService.showErrorToast(
                                'Connection Failed'
                            );
                        }
                    },
                    (err) => {
                        this.setLoading(false);
                        this.utilitiesService.showErrorToast(
                            'Connection Failed'
                        );
                    }
                );
        } catch {
            this.utilitiesService.showErrorToast('Connection Failed');
            this.setLoading(false);
        } finally {
        }
    }

    setLoading(value: boolean = false) {
        this.pingLoading = value;
        if (value) {
            this.signInForm.disable();
        } else {
            this.signInForm.enable();
        }
    }

    showSettingsPopover(loginObject) {
        let userObject = loginObject;
        let size = {
            height: '40%',
            width: '40%',
        };
        let isMobile = this.utilitiesService.isMobile();
        if (isMobile) {
            size.height = '80%';
            size.width = '100%';
        }
        const dialogRef = this.dialog.open(SettingsPopoverComponent, {
            data: { userObject },
            maxWidth: '',
            width: `${size.width}`,
            height: `${size.height}`,
            disableClose: true,
            panelClass: ['no-padding'],
        });
        dialogRef.afterClosed().subscribe((response) => {
            if (response) {
                this._authService.accessToken = loginObject.access;
                this.utilitiesService.setStorageItem(
                    LocalStorageKeys.AccessToken,
                    loginObject.access
                );
                this._authService._authenticated = true;
                this._authService._userService.user = loginObject.user_details;
                this.utilitiesService.setStorageItem(
                    LocalStorageKeys.User,
                    JSON.stringify(loginObject.user_details)
                );
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
            } else {
                this.utilitiesService.clearAllLocalStorage();
            }
        });
    }

    changeURL() {
        this.signInForm.controls.server_url.setValue(environment.server_url);
    }

    checkUrl() {
        return this.utilitiesService.getStorageItem(LocalStorageKeys.ServerURL);
    }
}
