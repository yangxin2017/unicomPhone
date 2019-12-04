import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Err500Page } from './err500';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    Err500Page,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(Err500Page),
  ],
})
export class Err500PageModule {}
