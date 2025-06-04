import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import { ComponentsModule } from 'app/modules/components/components.module';
import { PlateVerficationComponent } from './plate-verfication.component';
import { PlateVerificationRoutingModule } from './plate-verfication-routing.module';
import {IvyCarouselModule} from 'angular-responsive-carousel';

@NgModule({
    declarations: [PlateVerficationComponent],
    imports: [SharedModule, PlateVerificationRoutingModule, ComponentsModule,IvyCarouselModule],
    exports: [],
})
export class PlateVerificationModule {}
