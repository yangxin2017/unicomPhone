import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafePage } from './safe';
import { ComponentsModule } from '../../components/components.module';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SafePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(SafePage),
  ],
})
export class SafePageModule {}
