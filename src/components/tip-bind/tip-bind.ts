import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the TipBindComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tip-bind',
  templateUrl: 'tip-bind.html'
})
export class TipBindComponent {

  constructor(private modalCtrl:ModalController) {
  }

  showBind(){
    const modal = this.modalCtrl.create('BindMacPage');
    modal.present();
  }

}
