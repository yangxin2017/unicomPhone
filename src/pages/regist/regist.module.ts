import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistPage } from './regist';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RegistPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RegistPage),
  ],
})
export class RegistPageModule {}
