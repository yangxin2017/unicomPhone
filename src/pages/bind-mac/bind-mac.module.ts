import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindMacPage } from './bind-mac';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BindMacPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BindMacPage),
  ],
})
export class BindMacPageModule {}
