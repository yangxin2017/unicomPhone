import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutersPage } from './routers';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RoutersPage
  ],
  imports: [
    IonicPageModule.forChild(RoutersPage),
    ComponentsModule
  ],
})
export class RoutersPageModule {}
