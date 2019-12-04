import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MainPage),
  ],
})
export class MainPageModule {}
