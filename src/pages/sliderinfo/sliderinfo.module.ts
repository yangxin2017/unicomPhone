import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SliderinfoPage } from './sliderinfo';

@NgModule({
  declarations: [
    SliderinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SliderinfoPage),
  ],
})
export class SliderinfoPageModule {}
