import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import { ComponentsModule } from 'app/modules/components/components.module';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { CollectionReportComponent } from './collection/collection-report.component';
import { ClosingReportsComponent } from './closing/closing-reports.component';

@NgModule({
    declarations: [
        ReportsComponent,
        CollectionReportComponent,
        ClosingReportsComponent,
    ],
    imports: [SharedModule, ReportsRoutingModule, ComponentsModule],
    exports: [],
})
export class ReportsModule {}
