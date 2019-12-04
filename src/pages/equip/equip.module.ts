import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipPage } from './equip';
import { ComponentsModule } from '../../components/components.module';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EquipPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(EquipPage),
  ],
})
export class EquipPageModule {}
