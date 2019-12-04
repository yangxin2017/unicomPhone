import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RealchartPage } from './realchart';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RealchartPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RealchartPage),
  ],
})
export class RealchartPageModule {}
