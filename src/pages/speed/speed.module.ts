import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeedPage } from './speed';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SpeedPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SpeedPage),
  ],
})
export class SpeedPageModule {}
