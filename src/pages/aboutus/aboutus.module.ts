import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutusPage } from './aboutus';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AboutusPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AboutusPage),
  ],
})
export class AboutusPageModule {}
