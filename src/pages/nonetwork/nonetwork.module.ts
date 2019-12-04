import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NonetworkPage } from './nonetwork';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NonetworkPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(NonetworkPage),
  ],
})
export class NonetworkPageModule {}
