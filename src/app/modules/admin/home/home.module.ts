import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from 'app/shared';
import { HomeComponent } from './home.component';
import { ComponentsModule } from 'app/modules/components/components.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        SharedModule,
        HomeRoutingModule,
        ComponentsModule,
    ],
    exports: [],
})
export class HomeModule {}
