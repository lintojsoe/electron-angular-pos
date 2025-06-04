import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ActivatedGuard } from 'app/core/auth/guards/activatedGuard';
import { MainComponent } from 'app/modules/admin/main/main.component';
import { AppRoutes } from 'app/shared/constants';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: AppRoutes.Home,
                redirectTo: AppRoutes.Home,
                pathMatch: 'full',
            },
            {
                path: AppRoutes.Home,
                loadChildren: () =>
                    import('../home/home.module').then((m) => m.HomeModule),
            },
            {
                path: AppRoutes.Users,
                loadChildren: () =>
                    import('../users/users.module').then((m) => m.UsersModule),
                canActivate: [ActivatedGuard],
            },
            {
                path: AppRoutes.Reports,
                loadChildren: () =>
                    import('../reports/reports.module').then(
                        (m) => m.ReportsModule
                    ),
            },
            {
                path: AppRoutes.GateManagement,
                loadChildren: () =>
                    import('../gate-management/gate-management.module').then(
                        (m) => m.GateManagementModule
                    ),
            },
            {
                path: AppRoutes.VerifyPlate,
                loadChildren: () =>
                    import(
                        '../plate-verfication/plate-verfication.module'
                    ).then((m) => m.PlateVerificationModule),
            },
        ],
    },
];

@NgModule({
    declarations: [MainComponent],
    imports: [RouterModule.forChild(exampleRoutes)],
})
export class MainModule {}
