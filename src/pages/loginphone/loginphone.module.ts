import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginphonePage } from './loginphone';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LoginphonePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LoginphonePage),
  ],
})
export class LoginphonePageModule {}
