import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanPage } from './scan';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ScanPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ScanPage),
  ],
})
export class ScanPageModule {}
