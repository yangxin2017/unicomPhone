import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlankPage } from './blank';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BlankPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BlankPage),
  ],
})
export class BlankPageModule {}
