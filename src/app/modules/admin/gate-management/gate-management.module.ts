import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import { ComponentsModule } from 'app/modules/components/components.module';
import { GateManagementComponent } from './gate-management.component';
import { GateManagementRoutingModule } from './gate-management-routing.module';

@NgModule({
    declarations: [GateManagementComponent],
    imports: [SharedModule, GateManagementRoutingModule, ComponentsModule],
    exports: [],
})
export class GateManagementModule {}
