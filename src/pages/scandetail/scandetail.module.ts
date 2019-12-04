import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScandetailPage } from './scandetail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ScandetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ScandetailPage),
  ],
})
export class ScandetailPageModule {}
