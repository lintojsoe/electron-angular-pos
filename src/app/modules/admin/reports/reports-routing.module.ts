import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'app/shared/constants';
import { ClosingReportsComponent } from './closing/closing-reports.component';
import { CollectionReportComponent } from './collection/collection-report.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            {
                path: '',
                redirectTo: AppRoutes.CollectionReport,
                pathMatch: 'full',
            },
            {
                path: `${AppRoutes.CollectionReport}`,
                component: CollectionReportComponent,
            },
            {
                path: AppRoutes.ClosingReport,
                component: ClosingReportsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportsRoutingModule {}
