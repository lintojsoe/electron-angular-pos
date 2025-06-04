import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { UsersService } from 'app/services/usersService';
import { UserService } from 'app/core/user/user.service';
import { Groups } from 'app/shared/constants/groups';
import { AppRoutes } from 'app/shared/constants';
import { UtilitiesService } from 'app/services/utilitiesService';

@Injectable({
    providedIn: 'root',
})
export class ActivatedGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router, private utilitiesService: UtilitiesService) { }

    canActivate() {
        let isActive = false;
        const user = this.userService.userDetails();
        if (user) {
            if (user.groups && user.groups.length) {
                user.groups.filter((data) => {
                    if (data.id == Groups.MANAGER) {
                        isActive = true;
                    }
                });
            }
        }
        if (isActive) {
            return true
        } else {
            this.utilitiesService.showErrorToast("You dont have the permission to access this page")
            this.router.navigate([AppRoutes.Home])
            return
        }
    }
}
