import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import { UsersComponent } from './users.component';
import { ComponentsModule } from 'app/modules/components/components.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    declarations: [UsersComponent],
    imports: [SharedModule, UsersRoutingModule, ComponentsModule],
    exports: [],
})
export class UsersModule {}
