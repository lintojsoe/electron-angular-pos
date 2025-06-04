import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GateManagementComponent } from './gate-management.component';

const routes: Routes = [
    {
        path: '',
        component: GateManagementComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GateManagementRoutingModule {}
