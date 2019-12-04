import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiplinkrouterPage } from './tiplinkrouter';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TiplinkrouterPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TiplinkrouterPage),
  ],
})
export class TiplinkrouterPageModule {}
