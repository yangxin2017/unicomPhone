import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindrouterPage } from './bindrouter';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BindrouterPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BindrouterPage),
  ],
})
export class BindrouterPageModule {}
